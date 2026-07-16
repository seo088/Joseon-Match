from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Callable


ROOT_DIR = Path(__file__).resolve().parents[2]
MCP_SERVER_DIR = ROOT_DIR / "mcp-server"
FRONTEND_PUBLIC_DIR = ROOT_DIR / "frontend" / "public"

sys.path.insert(0, str(MCP_SERVER_DIR))

from resources.figure_resource import load_figures  # noqa: E402
from resources.trait_resource import load_traits  # noqa: E402
from tools.calculate_scores import calculate_scores_impl  # noqa: E402
from tools.find_matching_figure import find_matching_figure_impl  # noqa: E402
from tools.generate_result import generate_result_impl  # noqa: E402
from tools.get_questions import get_questions_impl  # noqa: E402


@dataclass
class HarnessCheck:
    name: str
    status: str
    detail: str


class JoseonMcpHarness:
    def __init__(self) -> None:
        self.checks: list[HarnessCheck] = []
        self.questions: list[dict[str, Any]] = []
        self.traits: list[dict[str, Any]] = []
        self.figures: list[dict[str, Any]] = []
        self.answers: dict[str, str] = {}
        self.scores: dict[str, float] = {}
        self.match_result: dict[str, Any] = {}
        self.result: dict[str, Any] = {}

    def run_check(self, name: str, check: Callable[[], str]) -> None:
        try:
            detail = check()
            self.checks.append(HarnessCheck(name=name, status="PASS", detail=detail))
        except Exception as exc:
            self.checks.append(HarnessCheck(name=name, status="FAIL", detail=str(exc)))
            raise

    def run(self) -> dict[str, Any]:
        self.run_check("get_questions returns 15 questions", self.check_get_questions)
        self.run_check("calculate_scores returns 8 trait scores", self.check_calculate_scores)
        self.run_check("find_matching_figure returns one of 16 candidates", self.check_find_matching_figure)
        self.run_check("generate_result returns result card data", self.check_generate_result)
        self.run_check("full MCP flow works end to end", self.check_full_flow)

        return {
            "harness": "Joseon Match MCP Flow Harness",
            "generatedAt": datetime.now().isoformat(timespec="seconds"),
            "status": "PASS",
            "summary": {
                "totalChecks": len(self.checks),
                "passed": len([check for check in self.checks if check.status == "PASS"]),
                "failed": len([check for check in self.checks if check.status == "FAIL"]),
            },
            "checks": [check.__dict__ for check in self.checks],
            "sample": {
                "answerCount": len(self.answers),
                "scoreKeys": list(self.scores.keys()),
                "bestMatchId": self.match_result["bestMatch"]["id"],
                "bestMatchName": self.match_result["bestMatch"]["name"],
                "rankingCount": len(self.match_result["ranking"]),
                "resultKeys": list(self.result.keys()),
            },
        }

    def check_get_questions(self) -> str:
        self.questions = get_questions_impl()
        self.traits = load_traits()
        self.figures = load_figures()

        assert len(self.questions) == 15, f"expected 15 questions, got {len(self.questions)}"
        for question in self.questions:
            assert question.get("id"), "question id is missing"
            assert len(question.get("choices", [])) == 2, f"{question['id']} must have 2 choices"

        return "15 binary-choice questions loaded"

    def check_calculate_scores(self) -> str:
        self.answers = {
            question["id"]: question["choices"][index % 2]["id"]
            for index, question in enumerate(self.questions)
        }
        self.scores = calculate_scores_impl(self.answers)
        trait_ids = {trait["id"] for trait in self.traits}

        assert set(self.scores.keys()) == trait_ids, "score keys do not match trait ids"
        assert len(self.scores) == 8, f"expected 8 traits, got {len(self.scores)}"
        for trait_id, score in self.scores.items():
            assert isinstance(score, (int, float)), f"{trait_id} score must be numeric"
            assert 0 <= score <= 10, f"{trait_id} score must be between 0 and 10"

        return "8 normalized trait scores returned"

    def check_find_matching_figure(self) -> str:
        self.match_result = find_matching_figure_impl(self.scores)
        figure_ids = {figure["id"] for figure in self.figures}
        best_match = self.match_result.get("bestMatch")
        ranking = self.match_result.get("ranking", [])

        assert len(self.figures) == 16, f"expected 16 figures, got {len(self.figures)}"
        assert best_match["id"] in figure_ids, "best match is not one of the configured figures"
        assert len(ranking) == 16, f"expected ranking of 16 figures, got {len(ranking)}"
        assert len(self.match_result.get("alternatives", [])) == 2, "expected 2 alternatives"

        return f"best match {best_match['id']} selected from 16 candidates"

    def check_generate_result(self) -> str:
        self.result = generate_result_impl(self.match_result, self.scores)
        required_keys = {
            "title",
            "figure",
            "description",
            "scores",
            "traitChartData",
            "topTraits",
            "strengths",
            "advice",
        }

        assert required_keys.issubset(self.result.keys()), "result is missing required keys"
        assert self.result["title"], "title must not be empty"
        assert self.result["description"], "description must not be empty"
        assert self.result["figure"].get("image"), "figure image must be included"
        assert len(self.result["traitChartData"]) == 8, "trait chart data must contain 8 rows"

        image_path = FRONTEND_PUBLIC_DIR / self.result["figure"]["image"].lstrip("/")
        assert image_path.is_file(), f"result image file is missing: {image_path}"

        for row in self.result["traitChartData"]:
            assert {"id", "name", "score"}.issubset(row.keys()), "chart row must include id, name, score"

        return "result includes title, description, image, and trait chart data"

    def check_full_flow(self) -> str:
        questions = get_questions_impl()
        answers = {question["id"]: "A" for question in questions}
        scores = calculate_scores_impl(answers)
        match_result = find_matching_figure_impl(scores)
        result = generate_result_impl(match_result, scores)

        assert len(questions) == 15, "flow question count mismatch"
        assert len(scores) == 8, "flow score count mismatch"
        assert match_result["bestMatch"]["id"] == result["figure"]["id"], "flow result figure mismatch"
        assert result["traitChartData"], "flow chart data is empty"

        return f"questions -> answers -> scores -> {result['figure']['id']} -> result completed"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run Joseon Match MCP harness tests.")
    parser.add_argument(
        "--report",
        default="test/harness/reports/latest-report.json",
        help="Path to write a JSON harness report.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    harness = JoseonMcpHarness()
    report = harness.run()
    report_path = (ROOT_DIR / args.report).resolve()
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(report, ensure_ascii=False, indent=2))
    print(f"Harness report written: {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
