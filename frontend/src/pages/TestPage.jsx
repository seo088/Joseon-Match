import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import { getQuestions } from "../services/mcpService.js";

const storageKey = "joseon-match:answers";

function loadAnswers() {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey)) ?? {};
  } catch {
    return {};
  }
}

export default function TestPage() {
  const navigate = useNavigate();
  const questions = useMemo(() => getQuestions(), []);
  const [answers, setAnswers] = useState(loadAnswers);
  const currentIndex = questions.findIndex((question) => !answers[question.id]);
  const safeIndex = currentIndex === -1 ? questions.length - 1 : currentIndex;
  const currentQuestion = questions[safeIndex];
  const completedCount = Object.keys(answers).length;
  const isDone = completedCount >= questions.length;

  useEffect(() => {
    if (isDone) {
      navigate("/loading");
    }
  }, [isDone, navigate]);

  const selectAnswer = (choiceId) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: choiceId };
    setAnswers(nextAnswers);
    window.localStorage.setItem(storageKey, JSON.stringify(nextAnswers));

    if (Object.keys(nextAnswers).length >= questions.length) {
      navigate("/loading");
    }
  };

  if (isDone) {
    return null;
  }

  return (
    <main className="app-shell">
      <section className="test-layout paper">
        <div className="test-heading">
          <span>문항 {safeIndex + 1}</span>
          <strong>총 {questions.length}문항</strong>
        </div>
        <ProgressBar current={completedCount + 1} total={questions.length} />
        <QuestionCard answer={answers[currentQuestion.id]} onSelect={selectAnswer} question={currentQuestion} />
      </section>
    </main>
  );
}
