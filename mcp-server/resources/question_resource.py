import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "questions.json"


def load_questions() -> list[dict]:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def read_questions() -> str:
    return json.dumps(load_questions(), ensure_ascii=False, indent=2)
