import { useApp } from '../../context/AppContext';

export default function BackButton({ light = false, onBack }) {
  const { goBack } = useApp();
  const color = light ? '#fff' : '#111827';
  return (
    <button
      onClick={onBack || goBack}
      className="bg-transparent border-0 cursor-pointer p-1 flex items-center justify-center"
      aria-label="Go back"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <path d="M19 12H5M12 5l-7 7 7 7"/>
      </svg>
    </button>
  );
}
