import ChoiceButton from "./ChoiceButton.jsx";

export default function QuestionCard({ answer, onSelect, question }) {
  return (
    <section className="question-card">
      {question.situation ? (
        <div className="situation-box">
          <span>상황</span>
          <p>{question.situation}</p>
        </div>
      ) : null}
      <h2>{question.text}</h2>
      <div className="choice-list">
        {question.choices.map((choice) => (
          <ChoiceButton
            choice={choice}
            isSelected={answer === choice.id}
            key={choice.id}
            onClick={() => onSelect(choice.id)}
          />
        ))}
      </div>
    </section>
  );
}
