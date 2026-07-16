from resources.figure_resource import load_figures
from resources.trait_resource import load_traits


def find_matching_figure_impl(scores: dict[str, int]) -> dict:
    trait_ids = [trait["id"] for trait in load_traits()]

    def distance(figure: dict) -> int:
        return sum(abs(int(scores.get(trait, 0)) - int(figure["traits"].get(trait, 0))) for trait in trait_ids)

    matches = sorted(load_figures(), key=distance)
    best = matches[0]
    return {**best, "matchDistance": distance(best)}
