from resources.question_resource import load_questions
from resources.trait_resource import load_traits


def trait_ids() -> list[str]:
    return [trait["id"] for trait in load_traits()]


def calculate_raw_scores_impl(answers: dict[str, str]) -> dict[str, int]:
    scores = {trait_id: 0 for trait_id in trait_ids()}

    for question in load_questions():
        choice_id = answers.get(question["id"])
        choice = next((item for item in question["choices"] if item["id"] == choice_id), None)
        if not choice:
            continue

        for trait, value in choice["scores"].items():
            scores[trait] = scores.get(trait, 0) + int(value)

    return scores


def calculate_maximum_scores_impl() -> dict[str, int]:
    maximum_scores = {trait_id: 0 for trait_id in trait_ids()}

    for question in load_questions():
        for trait_id in trait_ids():
            maximum_scores[trait_id] += max(choice["scores"].get(trait_id, 0) for choice in question["choices"])

    return maximum_scores


def normalize_scores_impl(raw_scores: dict[str, int], maximum_scores: dict[str, int]) -> dict[str, float]:
    normalized_scores = {}

    for trait_id in trait_ids():
        maximum = maximum_scores[trait_id]
        normalized_scores[trait_id] = 0 if maximum == 0 else round((raw_scores[trait_id] / maximum) * 10, 2)

    return normalized_scores


def calculate_scores_impl(answers: dict[str, str]) -> dict[str, float]:
    raw_scores = calculate_raw_scores_impl(answers)
    maximum_scores = calculate_maximum_scores_impl()
    return normalize_scores_impl(raw_scores, maximum_scores)
