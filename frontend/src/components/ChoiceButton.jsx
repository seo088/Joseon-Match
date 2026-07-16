export default function ChoiceButton({ choice, isSelected, onClick }) {
  return (
    <button className={`choice-button ${isSelected ? "selected" : ""}`} onClick={onClick} type="button">
      <span>{choice.id.toUpperCase()}</span>
      <strong>{choice.label}</strong>
    </button>
  );
}
