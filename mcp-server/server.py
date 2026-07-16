from mcp.server.fastmcp import FastMCP

from resources.figure_resource import read_figures
from resources.question_resource import read_questions
from resources.trait_resource import read_traits
from tools.calculate_scores import calculate_scores_impl
from tools.find_matching_figure import find_matching_figure_impl
from tools.generate_result import generate_result_impl
from tools.get_questions import get_questions_impl

mcp = FastMCP("Joseon Match")


@mcp.resource("joseon://questions")
def questions_resource() -> str:
    return read_questions()


@mcp.resource("joseon://figures")
def figures_resource() -> str:
    return read_figures()


@mcp.resource("joseon://traits")
def traits_resource() -> str:
    return read_traits()


@mcp.tool()
def get_questions() -> list[dict]:
    """검사 문항 목록을 반환합니다."""
    return get_questions_impl()


@mcp.tool()
def calculate_scores(answers: dict[str, str]) -> dict[str, int]:
    """문항 응답을 바탕으로 성향 점수를 계산합니다."""
    return calculate_scores_impl(answers)


@mcp.tool()
def find_matching_figure(scores: dict[str, int]) -> dict:
    """성향 점수와 가장 가까운 조선 인물 또는 직업군을 찾습니다."""
    return find_matching_figure_impl(scores)


@mcp.tool()
def generate_result(figure: dict, scores: dict[str, int]) -> dict:
    """매칭 결과 카드 내용을 생성합니다."""
    return generate_result_impl(figure, scores)


@mcp.prompt()
def profile_interview(topic: str = "진로와 성향") -> str:
    return f"{topic}을 바탕으로 조선시대 인물 매칭에 필요한 짧은 질문 5개를 만들어 주세요."


@mcp.prompt()
def result_writer(role_name: str, reason: str = "성향 키워드가 잘 맞습니다.") -> str:
    return f"{role_name} 결과를 제목, 한 줄 해설, 강점 3개, 현대식 조언 1개로 작성해 주세요. 이유: {reason}"


if __name__ == "__main__":
    mcp.run()
