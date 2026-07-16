from resources.figure_resource import load_figures


def find_matching_figure_impl(scores: dict[str, int]) -> dict:
    def distance(figure: dict) -> int:
        return sum(abs(int(scores.get(trait, 0)) - int(target)) for trait, target in figure["traits"].items())

    matches = sorted(load_figures(), key=distance)
    best = matches[0]
    return {**best, "matchDistance": distance(best)}
