from resources.question_resource import load_questions
from resources.trait_resource import load_traits


def calculate_scores_impl(answers: dict[str, str]) -> dict[str, int]:
    scores = {trait["id"]: 0 for trait in load_traits()}

    for question in load_questions():
        choice_id = answers.get(question["id"])
        choice = next((item for item in question["choices"] if item["id"] == choice_id), None)
        if not choice:
            continue

        for trait, value in choice["scores"].items():
            scores[trait] = scores.get(trait, 0) + int(value)

    return scores
