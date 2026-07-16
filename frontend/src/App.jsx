import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import LoadingPage from "./pages/LoadingPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";

export default function App() {
  const navigate = useNavigate();

  const startTest = () => {
    window.localStorage.removeItem("joseon-match:answers");
    window.localStorage.removeItem("joseon-match:result");
    navigate("/test");
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage onStart={startTest} />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/result" element={<ResultPage onRestart={startTest} />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
