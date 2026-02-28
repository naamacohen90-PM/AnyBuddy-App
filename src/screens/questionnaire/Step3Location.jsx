import { useApp } from '../../context/AppContext';
import StatusBar from '../../components/ui/StatusBar';
import BackButton from '../../components/ui/BackButton';
import ProgressBar from '../../components/ui/ProgressBar';
import { LOCATIONS } from '../../data/activities';

export default function Step3Location() {
  const { state, dispatch, navigate } = useApp();
  const { locations } = state;
  const toggle = (loc) => dispatch({ type: 'TOGGLE_LOCATION', payload: loc });

  return (
    <div className="screen">
      <StatusBar />
      <div className="pt-14 px-6">
        <div className="flex items-center gap-3 mb-5">
          <BackButton />
          <ProgressBar step={3} total={4} />
          <span className="text-[12px] font-bold text-gray-400">3/4</span>
        </div>
        <h2 className="text-[24px] font-extrabold text-gray-900 tracking-[-0.4px] mb-1">
          Where are you based?
        </h2>
        <p className="text-gray-500 text-[15px] mb-6">Pick one or more locations</p>

        <div className="pb-32">
          {LOCATIONS.map(loc => {
            const sel = locations.includes(loc);
            return (
              <div
                key={loc}
                className={`location-row ${sel ? 'location-selected' : ''}`}
                onClick={() => toggle(loc)}
              >
                <span
                  className="text-[15px] font-semibold transition-colors duration-150"
                  style={{ color: sel ? '#7C3AED' : '#111827' }}
                >
                  {loc}
                </span>
                {sel ? (
                  <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
                       style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <span className="text-gray-300 text-lg">+</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="sticky-action">
        <button
          className="btn-primary"
          disabled={!locations.length}
          onClick={() => locations.length && navigate('q4')}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
