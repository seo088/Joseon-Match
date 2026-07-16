def generate_result_impl(figure: dict, scores: dict[str, int]) -> dict:
    top_traits = sorted(scores.items(), key=lambda item: item[1], reverse=True)[:3]

    return {
        "title": f"당신은 조선의 {figure['name']}형 {figure['type']}",
        "figure": figure,
        "scores": scores,
        "strengths": [trait for trait, _ in top_traits],
        "description": figure["description"],
        "advice": "가장 높은 성향을 살릴 수 있는 작은 과제를 정하고 결과물로 보여 주세요.",
    }
