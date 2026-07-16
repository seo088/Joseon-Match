export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div aria-label={`진행률 ${percent}%`} className="progress" role="progressbar">
      <span style={{ width: `${percent}%` }} />
    </div>
  );
}
