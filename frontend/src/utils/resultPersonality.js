import {
  defaultCombination,
  disclaimer,
  lowTraitDescriptions,
  traitCombinations,
  traitDescriptions,
  traitStrengths
} from "../data/personalityResultData.js";
import traits from "../data/traits.json";

const traitOrder = traits.map((trait) => trait.id);
const traitLabelMap = Object.fromEntries(traits.map((trait) => [trait.id, trait.name]));

export function getTraitLevel(score) {
  if (score >= 7.5) return "veryHigh";
  if (score >= 6) return "high";
  if (score >= 4) return "middle";
  return "low";
}

export function getTopTraits(scores, count = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1] || traitOrder.indexOf(a[0]) - traitOrder.indexOf(b[0]))
    .slice(0, count)
    .map(([id, score]) => ({ id, label: traitLabelMap[id] ?? id, score }));
}

export function getLowTraits(scores, count = 2) {
  return Object.entries(scores)
    .sort((a, b) => a[1] - b[1] || traitOrder.indexOf(a[0]) - traitOrder.indexOf(b[0]))
    .slice(0, count)
    .map(([id, score]) => ({ id, label: traitLabelMap[id] ?? id, score }));
}

function getCombinationKey(topTraits) {
  return topTraits
    .slice(0, 2)
    .map((trait) => trait.id)
    .sort()
    .join("_");
}

function uniqueSentences(sentences) {
  return [...new Set(sentences.filter(Boolean))];
}

export function generateBehaviorAnalysis(scores) {
  return {
    workStyle: generateWorkStyle(scores),
    relationshipStyle: generateRelationshipStyle(scores),
    decisionStyle: generateDecisionStyle(scores)
  };
}

function generateWorkStyle(scores) {
  if (scores.practicality >= 7 && scores.power >= 6) {
    return "현실적인 계획을 세우고 주변의 역할을 정리해 실제 결과가 나오도록 일을 밀고 가는 편입니다.";
  }
  if (scores.creativity >= 7 && scores.curiosity >= 6) {
    return "문제의 원리를 살피고 기존 방식과 다른 해법을 찾아 자기만의 결과물로 풀어내는 데 강점이 있습니다.";
  }
  if (scores.empathy >= 7 && scores.practicality >= 6) {
    return "사람들의 필요를 살피면서도 실행 가능한 방식으로 일을 조율하는 편입니다.";
  }
  return "상황의 필요와 자신의 강점을 함께 살피며 안정적으로 일을 진행하는 편입니다.";
}

function generateRelationshipStyle(scores) {
  if (scores.empathy >= 7 && scores.power < 5) {
    return "앞에서 분위기를 주도하기보다 상대의 이야기를 듣고 편안한 관계를 만드는 데 강점이 있습니다.";
  }
  if (scores.empathy >= 7 && scores.power >= 6) {
    return "사람들의 의견을 세심하게 듣는 동시에 필요한 순간에는 관계의 방향을 이끌 수 있습니다.";
  }
  if (scores.justice >= 7) {
    return "관계에서도 신뢰와 책임을 중요하게 여기며 불공정한 상황을 그냥 넘기기 어려워합니다.";
  }
  return "상대와 상황에 따라 적절한 거리를 조절하며 관계를 이어가는 편입니다.";
}

function generateDecisionStyle(scores) {
  if (scores.practicality >= 7 && scores.adventure < 5) {
    return "가능성과 위험을 충분히 검토한 뒤 안정적으로 실행할 수 있는 선택을 고르는 편입니다.";
  }
  if (scores.adventure >= 7 && scores.curiosity >= 6) {
    return "새로운 가능성이 보이면 직접 경험하며 답을 찾는 선택을 선호합니다.";
  }
  if (scores.justice >= 7) {
    return "개인적인 이익만이 아니라 선택이 다른 사람과 공동체에 미칠 영향을 중요하게 고려합니다.";
  }
  return "한 가지 기준에만 의존하기보다 상황과 목적에 맞는 선택을 하려 합니다.";
}

export function generatePersonalityResult({ scores, matchedFigure }) {
  const topTraits = getTopTraits(scores, 3);
  const lowTraits = getLowTraits(scores, 2);
  const combinationKey = getCombinationKey(topTraits);
  const combinationDescription = traitCombinations[combinationKey] ?? defaultCombination;
  const topTraitSentences = topTraits.map(({ id, score }) => traitDescriptions[id]?.[getTraitLevel(score)]);
  const lowTraitSentence = lowTraitDescriptions[lowTraits[0]?.id];
  const figureConnection =
    matchedFigure.figureConnection ??
    `${matchedFigure.name}의 ${matchedFigure.role} 이미지처럼, 현재 응답에서는 ${topTraits
      .map((trait) => trait.label)
      .join(", ")} 성향이 비교적 두드러집니다.`;
  const behavior = generateBehaviorAnalysis(scores);
  const dynamicStrengths = topTraits.flatMap((trait) => traitStrengths[trait.id] ?? []).slice(0, 2);

  return {
    topTraits,
    lowTraits,
    combinationDescription,
    personalitySummary: uniqueSentences([
      combinationDescription,
      ...topTraitSentences,
      lowTraitSentence,
      figureConnection
    ]).slice(0, 6),
    personalizedStrengths: uniqueSentences([...(matchedFigure.strengths ?? []).slice(0, 2), ...dynamicStrengths]).slice(0, 4),
    caution: generateCaution(topTraits[0], scores),
    ...behavior,
    modernAdvice: generateModernAdvice(topTraits, matchedFigure),
    disclaimer
  };
}

function generateCaution(primaryTrait, scores) {
  if (!primaryTrait) return "한 가지 기준에만 치우치지 않도록 상황을 한 번 더 살펴보면 좋습니다.";

  const cautions = {
    curiosity: "깊이 파고드는 힘이 강한 만큼, 조사에 오래 머물러 실행 시점을 놓치지 않도록 해보세요.",
    justice: "옳은 기준을 지키려는 마음이 강한 만큼, 상대가 받아들일 수 있는 전달 방식도 함께 살펴보세요.",
    adventure: "새로운 가능성에 끌릴수록 준비와 회복 계획을 함께 세우면 선택이 더 단단해집니다.",
    creativity: "새로운 방식이 빛나려면 함께 일하는 사람들이 이해할 수 있는 설명도 같이 준비해보세요.",
    empathy: "다른 사람의 필요를 먼저 살피다가 자신의 의견이 뒤로 밀리지 않도록 균형을 잡아보세요.",
    practicality: "실행 가능성을 중시하는 만큼, 때로는 아직 검증되지 않은 가능성에도 작은 실험을 열어두면 좋습니다.",
    power: "방향을 이끄는 힘이 강하게 보일수록 주변 사람이 함께 납득할 수 있는 여지를 남겨보세요.",
    honor: "좋은 결과와 인정이 중요하더라도, 과정에서 스스로 지치지 않는 속도를 함께 챙겨보세요."
  };

  if (scores[primaryTrait.id] < 6) {
    return "현재 응답에서는 여러 성향이 고르게 나타나므로, 상황마다 우선순위를 분명히 정하면 판단이 더 쉬워집니다.";
  }

  return cautions[primaryTrait.id];
}

function generateModernAdvice(topTraits, matchedFigure) {
  const labels = topTraits.map((trait) => trait.label).join(", ");
  return `${labels} 성향이 강점으로 보이는 만큼, ${matchedFigure.name}처럼 자신의 역할을 분명히 하되 반복되는 일은 작은 절차와 기록으로 정리해보세요.`;
}
