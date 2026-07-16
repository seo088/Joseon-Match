import ChoiceButton from "./ChoiceButton.jsx";

export default function QuestionCard({ answer, onSelect, question }) {
  return (
    <section className="question-card">
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
