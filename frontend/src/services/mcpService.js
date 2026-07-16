const questions = [
  {
    id: "q1",
    text: "새로운 문제가 생겼을 때 가장 먼저 하는 행동은?",
    choices: [
      { id: "a", label: "원인을 분석하고 구조를 파악한다", traits: { analysis: 2 } },
      { id: "b", label: "사람들과 이야기하며 해법을 모은다", traits: { communication: 2 } },
      { id: "c", label: "직접 만들어 보고 고친다", traits: { creativity: 2 } }
    ]
  },
  {
    id: "q2",
    text: "가장 끌리는 역할은?",
    choices: [
      { id: "a", label: "정책과 제도를 설계하는 사람", traits: { leadership: 2, analysis: 1 } },
      { id: "b", label: "현장에서 사람을 설득하는 사람", traits: { communication: 2 } },
      { id: "c", label: "기술과 도구를 개선하는 사람", traits: { creativity: 2 } }
    ]
  },
  {
    id: "q3",
    text: "친구들이 자주 하는 평가는?",
    choices: [
      { id: "a", label: "침착하고 책임감이 강하다", traits: { leadership: 2 } },
      { id: "b", label: "말을 재미있게 잘한다", traits: { communication: 2 } },
      { id: "c", label: "작은 차이를 잘 관찰한다", traits: { analysis: 1, creativity: 1 } }
    ]
  }
];

const figures = [
  {
    id: "jang-yeongsil",
    name: "장영실",
    type: "발명가",
    traits: { creativity: 5, analysis: 4, leadership: 2, communication: 2 },
    description: "문제를 손으로 풀어내는 실험가형 인물입니다."
  },
  {
    id: "jeong-dojeon",
    name: "정도전",
    type: "설계자",
    traits: { leadership: 5, analysis: 5, communication: 3, creativity: 3 },
    description: "큰 그림을 그리고 제도를 세우는 전략가형 인물입니다."
  },
  {
    id: "storyteller",
    name: "전기수",
    type: "이야기꾼",
    traits: { communication: 5, creativity: 4, leadership: 2, analysis: 2 },
    description: "사람의 마음을 움직이는 표현가형 직업군입니다."
  }
];

export function getQuestions() {
  return questions;
}

export function calculateScores(questionList, answers) {
  return questionList.reduce((scores, question) => {
    const choice = question.choices.find((item) => item.id === answers[question.id]);
    if (!choice) return scores;

    for (const [trait, value] of Object.entries(choice.traits)) {
      scores[trait] = (scores[trait] ?? 0) + value;
    }

    return scores;
  }, { analysis: 0, communication: 0, creativity: 0, leadership: 0 });
}

export function findMatchingFigure(scores) {
  return figures
    .map((figure) => ({
      ...figure,
      distance: Object.entries(figure.traits).reduce((sum, [trait, target]) => {
        return sum + Math.abs((scores[trait] ?? 0) - target);
      }, 0)
    }))
    .sort((a, b) => a.distance - b.distance)[0];
}

export function generateResult(figure, scores) {
  return {
    figure,
    scores,
    title: `당신은 조선의 ${figure.name}형 ${figure.type}`,
    description: figure.description,
    advice: "강점이 드러나는 작은 프로젝트를 하나 정하고 결과물로 증명해 보세요."
  };
}
