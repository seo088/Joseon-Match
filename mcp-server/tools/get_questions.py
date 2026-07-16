from resources.question_resource import load_questions


def get_questions_impl() -> list[dict]:
    return load_questions()
