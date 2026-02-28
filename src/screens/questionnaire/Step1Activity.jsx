import { useApp } from '../../context/AppContext';
import StatusBar from '../../components/ui/StatusBar';
import BackButton from '../../components/ui/BackButton';
import ProgressBar from '../../components/ui/ProgressBar';
import { ACTIVITIES } from '../../data/activities';

export default function Step1Activity() {
  const { state, dispatch, navigate } = useApp();
  const { activities } = state;

  const toggle = (id) => dispatch({ type: 'TOGGLE_ACTIVITY', payload: id });

  return (
    <div className="screen">
      <StatusBar />

      {/* Header */}
      <div className="pt-14 px-6">
        <div className="flex items-center gap-3 mb-5">
          <BackButton onBack={() => navigate('signup')} />
          <ProgressBar step={1} total={4} />
          <span className="text-[12px] font-bold text-gray-400">1/4</span>
        </div>
        <h2 className="text-[24px] font-extrabold text-gray-900 tracking-[-0.4px] mb-1">
          What do you want to do?
        </h2>
        <p className="text-gray-500 text-[15px] mb-6">Pick one or more activities</p>
      </div>

      {/* Activity grid */}
      <div className="px-6 grid grid-cols-2 gap-3 mb-6">
        {ACTIVITIES.map(act => {
          const isSelected = activities.includes(act.id);
          return (
            <div
              key={act.id}
              className={`activity-card ${isSelected ? 'activity-selected' : ''}`}
              onClick={() => toggle(act.id)}
            >
              <div className="text-[36px] mb-2">{act.emoji}</div>
              <div
                className="text-[15px] font-bold"
                style={{ color: isSelected ? '#7C3AED' : '#111827' }}
              >
                {act.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky-action">
        <button
          className="btn-primary"
          disabled={activities.length === 0}
          onClick={() => activities.length > 0 && navigate('q2')}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
