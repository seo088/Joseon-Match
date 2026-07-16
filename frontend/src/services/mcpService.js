import figures from "../data/figures.json";
import questions from "../data/questions.json";
import traits from "../data/traits.json";
import { generatePersonalityResult } from "../utils/resultPersonality.js";

const traitIds = traits.map((trait) => trait.id);

export function getQuestions() {
  return questions;
}

export function getTraits() {
  return traits;
}

export function calculateRawScores(questionList, answers) {
  const scores = Object.fromEntries(traitIds.map((trait) => [trait, 0]));

  for (const question of questionList) {
    const selectedChoiceId = answers[question.id];
    const choice = question.choices.find((item) => item.id === selectedChoiceId);
    if (!choice) continue;

    for (const [trait, value] of Object.entries(choice.scores)) {
      scores[trait] += value;
    }
  }

  return scores;
}

export function calculateMaximumScores(questionList) {
  const maximumScores = Object.fromEntries(traitIds.map((trait) => [trait, 0]));

  for (const question of questionList) {
    for (const trait of traitIds) {
      const choiceScores = question.choices.map((choice) => choice.scores[trait] ?? 0);
      maximumScores[trait] += Math.max(...choiceScores);
    }
  }

  return maximumScores;
}

export function normalizeScores(rawScores, maximumScores) {
  return Object.fromEntries(
    traitIds.map((trait) => {
      const maximum = maximumScores[trait];
      const score = maximum === 0 ? 0 : Number(((rawScores[trait] / maximum) * 10).toFixed(2));
      return [trait, score];
    })
  );
}

export function calculateScores(questionList, answers) {
  const rawScores = calculateRawScores(questionList, answers);
  const maximumScores = calculateMaximumScores(questionList);
  return normalizeScores(rawScores, maximumScores);
}

function calculateDistance(userTraits, figureTraits) {
  const sum = traitIds.reduce((total, trait) => {
    const difference = (userTraits[trait] ?? 0) - (figureTraits[trait] ?? 0);
    return total + difference ** 2;
  }, 0);

  return Math.sqrt(sum);
}

function getTopTraitIds(scoreMap, count = 3) {
  return Object.entries(scoreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([trait]) => trait);
}

function calculateTopTraitBonus(userTraits, figureTraits) {
  const userTopTraits = getTopTraitIds(userTraits);
  const figureTopTraits = getTopTraitIds(figureTraits);
  const overlapCount = userTopTraits.filter((trait) => figureTopTraits.includes(trait)).length;

  return overlapCount * 0.8;
}

export function findMatchingFigure(userTraits) {
  const ranking = figures
    .map((figure) => {
      const distance = calculateDistance(userTraits, figure.traits);
      const topTraitBonus = calculateTopTraitBonus(userTraits, figure.traits);
      const finalDistance = distance - topTraitBonus;

      return { ...figure, distance, topTraitBonus, finalDistance };
    })
    .sort((a, b) => a.finalDistance - b.finalDistance || a.name.localeCompare(b.name, "ko"));

  return {
    bestMatch: ranking[0],
    alternatives: ranking.slice(1, 3),
    ranking
  };
}

export function generateResult(matchResult, scores) {
  const figure = matchResult.bestMatch ?? matchResult;
  const traitChartData = traits.map((trait) => ({
    id: trait.id,
    name: trait.name,
    score: scores[trait.id] ?? 0
  }));
  const topTraits = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => traits.find((trait) => trait.id === id)?.name ?? id);
  const personality = generatePersonalityResult({ scores, matchedFigure: figure });

  return {
    figure,
    alternatives: matchResult.alternatives ?? [],
    scores,
    traitChartData,
    topTraits,
    topTraitDetails: personality.topTraits,
    lowTraits: personality.lowTraits,
    title: `당신은 조선의 ${figure.name}형 ${figure.role}`,
    description: figure.summary,
    combinationDescription: personality.combinationDescription,
    personalitySummary: personality.personalitySummary,
    strengths: figure.strengths,
    personalizedStrengths: personality.personalizedStrengths,
    caution: personality.caution,
    workStyle: personality.workStyle,
    relationshipStyle: personality.relationshipStyle,
    decisionStyle: personality.decisionStyle,
    advice: figure.advice,
    modernAdvice: personality.modernAdvice,
    disclaimer: personality.disclaimer
  };
}

export function runJoseonMatch(answers) {
  if (Object.keys(answers).length !== questions.length) {
    throw new Error("모든 질문에 답해야 합니다.");
  }

  const rawScores = calculateRawScores(questions, answers);
  const maximumScores = calculateMaximumScores(questions);
  const normalizedScores = normalizeScores(rawScores, maximumScores);
  const matchResult = findMatchingFigure(normalizedScores);

  return {
    rawScores,
    maximumScores,
    ...generateResult(matchResult, normalizedScores)
  };
}
