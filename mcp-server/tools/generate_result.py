from resources.trait_resource import load_traits


def generate_result_impl(figure: dict, scores: dict[str, float]) -> dict:
    best_match = figure.get("bestMatch", figure)
    alternatives = figure.get("alternatives", [])
    trait_names = {trait["id"]: trait["name"] for trait in load_traits()}
    top_traits = sorted(scores.items(), key=lambda item: item[1], reverse=True)[:3]

    return {
        "title": f"당신은 조선의 {best_match['name']}형 {best_match['role']}",
        "figure": best_match,
        "alternatives": alternatives,
        "scores": scores,
        "topTraits": [trait_names.get(trait, trait) for trait, _ in top_traits],
        "strengths": best_match["strengths"],
        "description": best_match["summary"],
        "advice": best_match["advice"],
    }
