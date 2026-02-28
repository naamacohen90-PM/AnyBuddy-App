export default function ProgressBar({ step, total }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${(step / total) * 100}%` }} />
    </div>
  );
}
