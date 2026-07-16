import { useState } from "react";
import MainPage from "./pages/MainPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import LoadingPage from "./pages/LoadingPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import { calculateScores, findMatchingFigure, generateResult, getQuestions } from "./services/mcpService.js";

export default function App() {
  const [page, setPage] = useState("main");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const questions = getQuestions();

  const startTest = () => {
    setAnswers({});
    setResult(null);
    setPage("test");
  };

  const finishTest = () => {
    setPage("loading");
    window.setTimeout(() => {
      const scores = calculateScores(questions, answers);
      const figure = findMatchingFigure(scores);
      setResult(generateResult(figure, scores));
      setPage("result");
    }, 600);
  };

  if (page === "test") {
    return <TestPage answers={answers} onAnswer={setAnswers} onFinish={finishTest} questions={questions} />;
  }

  if (page === "loading") {
    return <LoadingPage />;
  }

  if (page === "result") {
    return <ResultPage onRestart={startTest} result={result} />;
  }

  return <MainPage onStart={startTest} />;
}
