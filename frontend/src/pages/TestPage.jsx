import { useEffect } from "react";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionCard from "../components/QuestionCard.jsx";

export default function TestPage({ answers, onAnswer, onFinish, questions }) {
  const currentIndex = Object.keys(answers).length;
  const currentQuestion = questions[Math.min(currentIndex, questions.length - 1)];
  const isDone = currentIndex >= questions.length;

  useEffect(() => {
    if (isDone) {
      onFinish();
    }
  }, [isDone, onFinish]);

  if (isDone) {
    return null;
  }

  return (
    <main className="app-shell">
      <section className="test-layout">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <QuestionCard
          answer={answers[currentQuestion.id]}
          onSelect={(choiceId) => onAnswer({ ...answers, [currentQuestion.id]: choiceId })}
          question={currentQuestion}
        />
      </section>
    </main>
  );
}
