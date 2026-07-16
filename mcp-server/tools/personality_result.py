from __future__ import annotations

from resources.trait_resource import load_traits


TRAIT_DESCRIPTIONS = {
    "curiosity": {
        "veryHigh": "새로운 정보의 배경과 구조를 깊게 파고드는 경향이 강하게 나타납니다.",
        "high": "낯선 정보가 주어지면 원인과 맥락을 확인하려는 태도가 비교적 뚜렷합니다.",
        "middle": "필요한 영역에서는 충분히 조사하지만 모든 일을 깊게 파고들지는 않습니다.",
        "low": "새로운 탐색보다 이미 검증된 정보와 경험을 효율적으로 활용하는 쪽을 선호합니다.",
    },
    "justice": {
        "veryHigh": "불공정하거나 원칙이 흔들리는 상황을 그냥 넘기기 어려워하며 직접 행동하려는 편입니다.",
        "high": "옳고 그름의 기준을 중요하게 여기고 책임 있는 선택을 선호합니다.",
        "middle": "원칙을 보되 관계와 현실적인 조건도 함께 고려합니다.",
        "low": "절대적인 원칙보다 현재 상황의 안정과 조화를 우선해서 판단하는 편입니다.",
    },
    "adventure": {
        "veryHigh": "불확실성이 있어도 가치가 있다고 판단하면 새로운 환경에 직접 뛰어드는 경향이 강합니다.",
        "high": "새로운 경험과 변화에 비교적 열려 있으며 기회가 오면 도전하려 합니다.",
        "middle": "가능성과 위험을 함께 본 뒤 감당할 수 있다고 판단되면 움직입니다.",
        "low": "위험한 선택보다 안정적이고 예측 가능한 방식으로 진행하는 것을 선호합니다.",
    },
    "creativity": {
        "veryHigh": "정해진 방식을 그대로 따르기보다 자신만의 해결책과 표현을 만드는 힘이 강합니다.",
        "high": "기존 방식에서 개선점을 찾고 새로운 아이디어를 더하는 데 익숙합니다.",
        "middle": "검증된 방식을 사용하면서도 필요한 부분에는 새로운 생각을 적용합니다.",
        "low": "새로움 자체보다 안정적인 절차와 완성도를 더 중요하게 여깁니다.",
    },
    "empathy": {
        "veryHigh": "상대의 감정과 처지를 빠르게 읽고 결정의 영향을 세심하게 고려합니다.",
        "high": "다른 사람의 입장을 이해하고 관계 안에서 조화를 만들려는 편입니다.",
        "middle": "사람의 감정을 고려하되 필요할 때는 객관적인 기준도 함께 봅니다.",
        "low": "감정적 반응보다 사실, 기준, 결과를 중심으로 판단하려는 경향이 있습니다.",
    },
    "practicality": {
        "veryHigh": "좋은 생각을 실제로 실행 가능한 방법과 결과로 옮기는 힘이 강합니다.",
        "high": "현실적인 조건을 빠르게 파악하고 실행 가능한 해결책을 찾는 데 강점이 있습니다.",
        "middle": "이상과 현실 사이에서 균형을 맞추며 목표에 맞는 방법을 고릅니다.",
        "low": "당장의 효율보다 의미, 가능성, 자신만의 기준을 더 중요하게 볼 수 있습니다.",
    },
    "power": {
        "veryHigh": "의견을 분명히 제시하고 사람이나 조직의 방향에 적극적으로 영향을 주려 합니다.",
        "high": "필요한 상황에서는 앞에 서서 방향을 정하고 결정을 이끄는 편입니다.",
        "middle": "상황에 따라 주도하는 역할과 지원하는 역할을 유연하게 선택합니다.",
        "low": "앞에서 지휘하기보다 맡은 역할을 충실히 수행하며 결과로 기여하는 방식을 선호합니다.",
    },
    "honor": {
        "veryHigh": "자신의 성취가 인정받고 의미 있는 흔적으로 남는 것을 중요하게 여깁니다.",
        "high": "노력과 성과에 대한 정당한 인정과 책임 있는 평판을 중요하게 생각합니다.",
        "middle": "인정은 반기지만 타인의 평가만을 목표로 행동하지는 않습니다.",
        "low": "외부의 명성보다 스스로 납득할 수 있는 과정과 일상의 만족을 중시합니다.",
    },
}

LOW_TRAIT_DESCRIPTIONS = {
    "curiosity": "모든 것을 깊게 분석하기보다 필요한 정보가 확보되면 다음 단계로 넘어가는 편입니다.",
    "justice": "원칙만 강하게 적용하기보다 관계와 상황의 맥락을 함께 살피려는 편입니다.",
    "adventure": "충동적인 변화보다 준비된 선택과 안정적인 진행을 선호합니다.",
    "creativity": "새로운 방식보다 이미 효과가 검증된 절차와 안정적인 완성도를 중시합니다.",
    "empathy": "감정에 휩쓸리기보다 객관적인 사실과 결과를 기준으로 판단하려는 편입니다.",
    "practicality": "당장의 효율보다 의미, 가능성, 자신만의 기준을 더 중요하게 여길 수 있습니다.",
    "power": "직접 지휘하기보다 자신의 역할과 전문성을 통해 조용히 기여하는 방식을 선호합니다.",
    "honor": "타인의 평가나 명성보다 스스로 만족할 수 있는 과정과 결과를 중요하게 여깁니다.",
}

TRAIT_COMBINATIONS = {
    "curiosity_creativity": "새로운 원리를 발견하는 데서 그치지 않고 자신만의 방식이나 결과물로 구현하려는 성향이 있습니다.",
    "curiosity_practicality": "정보를 탐색하는 데서 멈추지 않고 실제로 쓸모 있는 지식인지 함께 따져보는 편입니다.",
    "curiosity_adventure": "궁금한 것을 머릿속으로만 두지 않고 직접 확인하고 경험하며 답을 찾으려 합니다.",
    "curiosity_justice": "문제의 원인을 자세히 파악하고 무엇이 옳은지 근거를 바탕으로 판단하려 합니다.",
    "curiosity_empathy": "사람의 말과 행동을 세심하게 관찰하며 그 안에 담긴 이유와 감정을 이해하려 합니다.",
    "justice_adventure": "옳다고 판단한 일에는 어려움이나 위험이 있어도 행동으로 옮길 가능성이 높습니다.",
    "justice_practicality": "좋은 목표를 주장하는 데 그치지 않고 실제로 실행 가능한 제도와 방법을 찾습니다.",
    "justice_empathy": "원칙을 지키는 동시에 그 결정이 사람들에게 미칠 영향을 중요하게 고려합니다.",
    "justice_power": "불합리한 상황을 발견하면 자신의 영향력을 사용해 구조와 규칙을 바꾸려 합니다.",
    "adventure_practicality": "새로운 도전을 즐기지만 성공 가능성과 준비 조건도 함께 계산합니다.",
    "adventure_honor": "어려운 도전 속에서 자신의 역량을 증명하고 의미 있는 성취를 남기려 합니다.",
    "adventure_power": "변화가 필요한 상황에서 먼저 움직이고 주변 사람들을 이끄는 성향이 있습니다.",
    "creativity_empathy": "사람들의 감정과 필요를 이해하고 이를 이야기, 표현, 새로운 아이디어로 풀어내는 데 강점이 있습니다.",
    "creativity_practicality": "새로운 아이디어를 떠올리는 데서 끝내지 않고 실제로 사용할 수 있는 형태로 구체화합니다.",
    "creativity_honor": "자신만의 표현과 결과물을 통해 개성과 성취를 인정받고 싶어 하는 경향이 있습니다.",
    "empathy_practicality": "사람들의 필요를 빠르게 파악하고 실제 생활에서 도움이 되는 해결책을 찾는 데 강점이 있습니다.",
    "empathy_power": "사람들의 의견을 듣고 조율하면서도 필요한 때에는 공동체의 방향을 이끌 수 있습니다.",
    "empathy_honor": "사람들과 좋은 관계를 맺고 신뢰받는 사람으로 기억되는 것을 중요하게 생각합니다.",
    "practicality_power": "현실적인 계획을 세우고 주변 사람들을 조직해 실제 결과를 만들어내는 편입니다.",
    "practicality_honor": "눈에 보이는 성과와 책임 있는 완수를 통해 자신의 가치를 증명하려 합니다.",
    "power_honor": "중요한 역할을 맡고 자신의 판단과 성과가 인정받는 상황에서 동기를 얻는 편입니다.",
}

TRAIT_STRENGTHS = {
    "curiosity": ["새로운 정보의 핵심을 빠르게 파악합니다.", "문제의 원인과 구조를 깊이 살펴봅니다."],
    "justice": ["책임이 필요한 상황을 쉽게 피하지 않습니다.", "불합리한 문제를 발견하고 개선하려 합니다."],
    "adventure": ["변화가 필요한 순간에 먼저 움직일 수 있습니다.", "낯선 환경에서도 새로운 가능성을 발견합니다."],
    "creativity": ["정해진 방식 밖의 해결책을 떠올립니다.", "아이디어를 자기만의 표현으로 바꾸는 힘이 있습니다."],
    "empathy": ["사람들의 분위기와 필요를 섬세하게 읽습니다.", "결정이 주변에 미칠 영향을 고려합니다."],
    "practicality": ["실행 가능한 해결책을 빠르게 찾습니다.", "복잡한 일을 현실적인 순서로 정리합니다."],
    "power": ["필요한 순간에 방향을 제시합니다.", "사람들을 움직이게 하는 추진력이 있습니다."],
    "honor": ["맡은 일을 책임감 있게 완수하려 합니다.", "성과의 의미와 품질을 중요하게 여깁니다."],
}

DISCLAIMER = "본 결과는 사용자의 선택을 바탕으로 구성된 오락 및 자기 탐색용 콘텐츠이며, 전문적인 심리검사나 진단을 목적으로 하지 않습니다."


def get_trait_level(score: float) -> str:
    if score >= 7.5:
        return "veryHigh"
    if score >= 6:
        return "high"
    if score >= 4:
        return "middle"
    return "low"


def trait_labels() -> dict[str, str]:
    return {trait["id"]: trait["name"] for trait in load_traits()}


def trait_order() -> list[str]:
    return [trait["id"] for trait in load_traits()]


def get_top_traits(scores: dict[str, float], count: int = 3) -> list[dict]:
    order = trait_order()
    labels = trait_labels()
    items = sorted(scores.items(), key=lambda item: (-item[1], order.index(item[0])))
    return [{"id": trait_id, "label": labels.get(trait_id, trait_id), "score": score} for trait_id, score in items[:count]]


def get_low_traits(scores: dict[str, float], count: int = 2) -> list[dict]:
    order = trait_order()
    labels = trait_labels()
    items = sorted(scores.items(), key=lambda item: (item[1], order.index(item[0])))
    return [{"id": trait_id, "label": labels.get(trait_id, trait_id), "score": score} for trait_id, score in items[:count]]


def unique_sentences(sentences: list[str | None]) -> list[str]:
    result = []
    for sentence in sentences:
        if sentence and sentence not in result:
            result.append(sentence)
    return result


def generate_personality_result(scores: dict[str, float], matched_figure: dict) -> dict:
    top_traits = get_top_traits(scores)
    low_traits = get_low_traits(scores)
    combination_key = "_".join(sorted([trait["id"] for trait in top_traits[:2]]))
    combination_description = TRAIT_COMBINATIONS.get(
        combination_key,
        "여러 기준을 함께 고려하며 한쪽 성향에만 치우치지 않고 상황에 맞게 판단하는 편입니다.",
    )
    top_sentences = [
        TRAIT_DESCRIPTIONS[trait["id"]][get_trait_level(float(trait["score"]))]
        for trait in top_traits
    ]
    low_sentence = LOW_TRAIT_DESCRIPTIONS.get(low_traits[0]["id"])
    figure_connection = (
        f"{matched_figure['name']}의 {matched_figure['role']} 이미지처럼, 현재 응답에서는 "
        f"{', '.join(trait['label'] for trait in top_traits)} 성향이 비교적 두드러집니다."
    )
    dynamic_strengths = []
    for trait in top_traits:
        dynamic_strengths.extend(TRAIT_STRENGTHS.get(trait["id"], []))

    return {
        "topTraits": top_traits,
        "lowTraits": low_traits,
        "combinationDescription": combination_description,
        "personalitySummary": unique_sentences(
            [combination_description, *top_sentences, low_sentence, figure_connection]
        )[:6],
        "personalizedStrengths": unique_sentences([*matched_figure.get("strengths", [])[:2], *dynamic_strengths])[:4],
        "caution": generate_caution(top_traits[0], scores),
        "workStyle": generate_work_style(scores),
        "relationshipStyle": generate_relationship_style(scores),
        "decisionStyle": generate_decision_style(scores),
        "modernAdvice": generate_modern_advice(top_traits, matched_figure),
        "disclaimer": DISCLAIMER,
    }


def generate_caution(primary_trait: dict, scores: dict[str, float]) -> str:
    cautions = {
        "curiosity": "깊이 파고드는 힘이 강한 만큼, 조사에 오래 머물러 실행 시점을 놓치지 않도록 해보세요.",
        "justice": "옳은 기준을 지키려는 마음이 강한 만큼, 상대가 받아들일 수 있는 전달 방식도 함께 살펴보세요.",
        "adventure": "새로운 가능성에 끌릴수록 준비와 회복 계획을 함께 세우면 선택이 더 단단해집니다.",
        "creativity": "새로운 방식이 빛나려면 함께 일하는 사람들이 이해할 수 있는 설명도 같이 준비해보세요.",
        "empathy": "다른 사람의 필요를 먼저 살피다가 자신의 의견이 뒤로 밀리지 않도록 균형을 잡아보세요.",
        "practicality": "실행 가능성을 중시하는 만큼, 때로는 아직 검증되지 않은 가능성에도 작은 실험을 열어두면 좋습니다.",
        "power": "방향을 이끄는 힘이 강하게 보일수록 주변 사람이 함께 납득할 수 있는 여지를 남겨보세요.",
        "honor": "좋은 결과와 인정이 중요하더라도, 과정에서 스스로 지치지 않는 속도를 함께 챙겨보세요.",
    }
    if scores.get(primary_trait["id"], 0) < 6:
        return "현재 응답에서는 여러 성향이 고르게 나타나므로, 상황마다 우선순위를 분명히 정하면 판단이 더 쉬워집니다."
    return cautions[primary_trait["id"]]


def generate_work_style(scores: dict[str, float]) -> str:
    if scores.get("practicality", 0) >= 7 and scores.get("power", 0) >= 6:
        return "현실적인 계획을 세우고 주변의 역할을 정리해 실제 결과가 나오도록 일을 밀고 가는 편입니다."
    if scores.get("creativity", 0) >= 7 and scores.get("curiosity", 0) >= 6:
        return "문제의 원리를 살피고 기존 방식과 다른 해법을 찾아 자기만의 결과물로 풀어내는 데 강점이 있습니다."
    if scores.get("empathy", 0) >= 7 and scores.get("practicality", 0) >= 6:
        return "사람들의 필요를 살피면서도 실행 가능한 방식으로 일을 조율하는 편입니다."
    return "상황의 필요와 자신의 강점을 함께 살피며 안정적으로 일을 진행하는 편입니다."


def generate_relationship_style(scores: dict[str, float]) -> str:
    if scores.get("empathy", 0) >= 7 and scores.get("power", 0) < 5:
        return "앞에서 분위기를 주도하기보다 상대의 이야기를 듣고 편안한 관계를 만드는 데 강점이 있습니다."
    if scores.get("empathy", 0) >= 7 and scores.get("power", 0) >= 6:
        return "사람들의 의견을 세심하게 듣는 동시에 필요한 순간에는 관계의 방향을 이끌 수 있습니다."
    if scores.get("justice", 0) >= 7:
        return "관계에서도 신뢰와 책임을 중요하게 여기며 불공정한 상황을 그냥 넘기기 어려워합니다."
    return "상대와 상황에 따라 적절한 거리를 조절하며 관계를 이어가는 편입니다."


def generate_decision_style(scores: dict[str, float]) -> str:
    if scores.get("practicality", 0) >= 7 and scores.get("adventure", 0) < 5:
        return "가능성과 위험을 충분히 검토한 뒤 안정적으로 실행할 수 있는 선택을 고르는 편입니다."
    if scores.get("adventure", 0) >= 7 and scores.get("curiosity", 0) >= 6:
        return "새로운 가능성이 보이면 직접 경험하며 답을 찾는 선택을 선호합니다."
    if scores.get("justice", 0) >= 7:
        return "개인적인 이익만이 아니라 선택이 다른 사람과 공동체에 미칠 영향을 중요하게 고려합니다."
    return "한 가지 기준에만 의존하기보다 상황과 목적에 맞는 선택을 하려 합니다."


def generate_modern_advice(top_traits: list[dict], matched_figure: dict) -> str:
    labels = ", ".join(trait["label"] for trait in top_traits)
    return f"{labels} 성향이 강점으로 보이는 만큼, {matched_figure['name']}처럼 자신의 역할을 분명히 하되 반복되는 일은 작은 절차와 기록으로 정리해보세요."
