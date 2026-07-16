import figures from "../data/figures.json";
import questions from "../data/questions.json";
import traits from "../data/traits.json";

const traitIds = traits.map((trait) => trait.id);

export function getQuestions() {
  return questions;
}

export function getTraits() {
  return traits;
}

export function calculateScores(questionList, answers) {
  const scores = Object.fromEntries(traitIds.map((trait) => [trait, 0]));

  for (const question of questionList) {
    const choice = question.choices.find((item) => item.id === answers[question.id]);
    if (!choice) continue;

    for (const [trait, value] of Object.entries(choice.scores)) {
      scores[trait] += value;
    }
  }

  return scores;
}

export function findMatchingFigure(scores) {
  return figures
    .map((figure) => {
      const distance = traitIds.reduce((sum, trait) => {
        return sum + Math.abs((scores[trait] ?? 0) - (figure.traits[trait] ?? 0));
      }, 0);

      return { ...figure, distance };
    })
    .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name, "ko"))[0];
}

export function generateResult(figure, scores) {
  const topTraits = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => traits.find((trait) => trait.id === id)?.name ?? id);

  return {
    figure,
    scores,
    topTraits,
    title: `당신은 조선의 ${figure.name}형 ${figure.role}`,
    description: figure.summary,
    strengths: figure.strengths,
    advice: figure.advice
  };
}

export function runJoseonMatch(answers) {
  const scores = calculateScores(questions, answers);
  const figure = findMatchingFigure(scores);
  return generateResult(figure, scores);
}
