from resources.question_resource import load_questions


def calculate_scores_impl(answers: dict[str, str]) -> dict[str, int]:
    scores = {"analysis": 0, "communication": 0, "creativity": 0, "leadership": 0, "care": 0}

    for question in load_questions():
        choice_id = answers.get(question["id"])
        choice = next((item for item in question["choices"] if item["id"] == choice_id), None)
        if not choice:
            continue

        for trait, value in choice["traits"].items():
            scores[trait] = scores.get(trait, 0) + int(value)

    return scores
