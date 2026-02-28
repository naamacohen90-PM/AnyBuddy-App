import { useApp } from '../../context/AppContext';
import StatusBar from '../../components/ui/StatusBar';
import BackButton from '../../components/ui/BackButton';
import ProgressBar from '../../components/ui/ProgressBar';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Step4Dates() {
  const { state, dispatch, navigate } = useApp();
  const { dates } = state;
  const toggle = (key) => dispatch({ type: 'TOGGLE_DATE', payload: key });

  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d,
      key:  d.toDateString(),
      wd:   WEEKDAYS[d.getDay()],
      num:  d.getDate(),
      mon:  d.toLocaleDateString('en-US', { month: 'short' }),
      showMonth: i === 0 || d.getDate() === 1,
    };
  });

  return (
    <div className="screen">
      <StatusBar />
      <div className="pt-14 px-6 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <BackButton />
          <ProgressBar step={4} total={4} />
          <span className="text-[12px] font-bold text-gray-400">4/4</span>
        </div>
        <h2 className="text-[24px] font-extrabold text-gray-900 tracking-[-0.4px] mb-1">
          When are you free?
        </h2>
        <p className="text-gray-500 text-[15px] mb-6">Pick your available dates (next 2 weeks)</p>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1.5 mb-6">
          {days.map(({ key, wd, num, mon, showMonth }) => {
            const sel = dates.includes(key);
            return (
              <div
                key={key}
                className={`day-cell ${sel ? 'day-selected' : ''}`}
                onClick={() => toggle(key)}
              >
                <span className="text-[10px] font-bold mb-1"
                      style={{ color: sel ? 'rgba(255,255,255,0.8)' : '#9ca3af' }}>
                  {wd}
                </span>
                <span className="text-[16px] font-extrabold"
                      style={{ color: sel ? 'white' : '#111827' }}>
                  {num}
                </span>
                {showMonth && (
                  <span className="text-[9px] mt-0.5"
                        style={{ color: sel ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>
                    {mon}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Selection summary */}
        {dates.length > 0 && (
          <div className="rounded-2xl px-4 py-3 flex items-center gap-2 mb-5"
               style={{ background: '#ede9fe' }}>
            <span className="text-lg">📅</span>
            <span className="text-[14px] font-bold" style={{ color: '#7C3AED' }}>
              {dates.length} date{dates.length > 1 ? 's' : ''} selected
            </span>
          </div>
        )}

        <button
          className="btn-primary mb-3"
          disabled={!dates.length}
          onClick={() => dates.length && navigate('results')}
        >
          Find My Buddy! 🎯
        </button>
        <button className="btn-secondary" onClick={() => navigate('results')}>
          Skip — I'm flexible
        </button>
      </div>
    </div>
  );
}
