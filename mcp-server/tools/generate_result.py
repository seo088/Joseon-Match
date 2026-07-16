from resources.trait_resource import load_traits
from tools.personality_result import generate_personality_result


def generate_result_impl(figure: dict, scores: dict[str, float]) -> dict:
    best_match = figure.get("bestMatch", figure)
    alternatives = figure.get("alternatives", [])
    trait_names = {trait["id"]: trait["name"] for trait in load_traits()}
    top_traits = sorted(scores.items(), key=lambda item: item[1], reverse=True)[:3]
    personality = generate_personality_result(scores, best_match)
    trait_chart_data = [
        {
            "id": trait_id,
            "name": trait_names.get(trait_id, trait_id),
            "score": scores.get(trait_id, 0),
        }
        for trait_id in trait_names
    ]

    return {
        "title": f"당신은 조선의 {best_match['name']}형 {best_match['role']}",
        "figure": best_match,
        "alternatives": alternatives,
        "scores": scores,
        "traitChartData": trait_chart_data,
        "topTraits": [trait_names.get(trait, trait) for trait, _ in top_traits],
        "topTraitDetails": personality["topTraits"],
        "lowTraits": personality["lowTraits"],
        "combinationDescription": personality["combinationDescription"],
        "personalitySummary": personality["personalitySummary"],
        "strengths": best_match["strengths"],
        "personalizedStrengths": personality["personalizedStrengths"],
        "caution": personality["caution"],
        "workStyle": personality["workStyle"],
        "relationshipStyle": personality["relationshipStyle"],
        "decisionStyle": personality["decisionStyle"],
        "description": best_match["summary"],
        "advice": best_match["advice"],
        "modernAdvice": personality["modernAdvice"],
        "disclaimer": personality["disclaimer"],
    }
