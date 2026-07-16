from math import sqrt

from resources.figure_resource import load_figures
from resources.trait_resource import load_traits


def trait_ids() -> list[str]:
    return [trait["id"] for trait in load_traits()]


def get_top_traits(traits: dict[str, float], count: int = 3) -> list[str]:
    return [trait for trait, _ in sorted(traits.items(), key=lambda item: item[1], reverse=True)[:count]]


def calculate_distance(user_traits: dict[str, float], figure_traits: dict[str, float]) -> float:
    return sqrt(
        sum((float(user_traits.get(trait, 0)) - float(figure_traits.get(trait, 0))) ** 2 for trait in trait_ids())
    )


def calculate_top_trait_bonus(user_traits: dict[str, float], figure_traits: dict[str, float]) -> float:
    user_top_traits = get_top_traits(user_traits)
    figure_top_traits = get_top_traits(figure_traits)
    overlap_count = len([trait for trait in user_top_traits if trait in figure_top_traits])
    return overlap_count * 0.8


def find_matching_figure_impl(scores: dict[str, float]) -> dict:
    ranked_figures = []

    for figure in load_figures():
        distance = calculate_distance(scores, figure["traits"])
        top_trait_bonus = calculate_top_trait_bonus(scores, figure["traits"])
        final_distance = distance - top_trait_bonus

        ranked_figures.append({
            **figure,
            "distance": round(distance, 4),
            "topTraitBonus": top_trait_bonus,
            "finalDistance": round(final_distance, 4),
        })

    ranked_figures.sort(key=lambda figure: (figure["finalDistance"], figure["name"]))

    return {
        "bestMatch": ranked_figures[0],
        "alternatives": ranked_figures[1:3],
        "ranking": ranked_figures,
    }
