from resources.trait_resource import load_traits


def generate_result_impl(figure: dict, scores: dict[str, int]) -> dict:
    trait_names = {trait["id"]: trait["name"] for trait in load_traits()}
    top_traits = sorted(scores.items(), key=lambda item: item[1], reverse=True)[:3]

    return {
        "title": f"당신은 조선의 {figure['name']}형 {figure['role']}",
        "figure": figure,
        "scores": scores,
        "topTraits": [trait_names.get(trait, trait) for trait, _ in top_traits],
        "strengths": figure["strengths"],
        "description": figure["summary"],
        "advice": figure["advice"],
    }
