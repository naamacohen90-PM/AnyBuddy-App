import { useApp } from '../../context/AppContext';
import StatusBar from '../../components/ui/StatusBar';
import BackButton from '../../components/ui/BackButton';
import ProgressBar from '../../components/ui/ProgressBar';
import { ACTIVITIES, PREFS } from '../../data/activities';

function ChipGroup({ items, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <button
          key={item}
          className={`chip ${selected.includes(item) ? 'chip-selected' : ''}`}
          onClick={() => onToggle(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

/* Renders preference sections for a single activity */
function ActivityPrefSection({ actId, prefs, onToggle }) {
  const p = PREFS[actId];
  if (!p) return null;

  if (actId === 'concert') return (
    <>
      <p className="text-[13px] font-bold text-gray-700 mb-3">Music Genres</p>
      <ChipGroup items={p.genres} selected={prefs} onToggle={onToggle} />
      <p className="text-[13px] font-bold text-gray-700 mt-5 mb-3">Favorite Artists</p>
      <ChipGroup items={p.artists} selected={prefs} onToggle={onToggle} />
    </>
  );

  if (actId === 'hiking') return (
    <>
      <p className="text-[13px] font-bold text-gray-700 mb-3">Hike Type</p>
      <ChipGroup items={p.types} selected={prefs} onToggle={onToggle} />
      <p className="text-[13px] font-bold text-gray-700 mt-5 mb-3">Destinations</p>
      <ChipGroup items={p.destinations} selected={prefs} onToggle={onToggle} />
    </>
  );

  return (
    <>
      <p className="text-[13px] font-bold text-gray-700 mb-3">Select your preferences</p>
      <ChipGroup items={p} selected={prefs} onToggle={onToggle} />
    </>
  );
}

export default function Step2Prefs() {
  const { state, dispatch, navigate } = useApp();
  const { activities, prefs } = state;
  const toggle = (item) => dispatch({ type: 'TOGGLE_PREF', payload: item });

  return (
    <div className="screen">
      <StatusBar />
      <div className="pt-14 px-6">
        <div className="flex items-center gap-3 mb-5">
          <BackButton />
          <ProgressBar step={2} total={4} />
          <span className="text-[12px] font-bold text-gray-400">2/4</span>
        </div>
        <h2 className="text-[24px] font-extrabold text-gray-900 tracking-[-0.4px] mb-1">
          Your preferences
        </h2>
        <p className="text-gray-500 text-[15px] mb-6">Select as many as you like</p>

        <div className="pb-32 flex flex-col gap-0">
          {activities.map((actId, idx) => {
            const actLabel = ACTIVITIES.find(a => a.id === actId)?.label || actId;
            const actEmoji = ACTIVITIES.find(a => a.id === actId)?.emoji || '';
            return (
              <div key={actId}>
                {/* Activity divider (shown between sections, not before first) */}
                {activities.length > 1 && (
                  <div className={`flex items-center gap-2 mb-4 ${idx > 0 ? 'mt-8' : ''}`}>
                    <span className="text-[18px]">{actEmoji}</span>
                    <span className="text-[15px] font-extrabold text-gray-900">{actLabel}</span>
                    <div className="flex-1 h-px bg-gray-100 ml-1" />
                  </div>
                )}
                <ActivityPrefSection actId={actId} prefs={prefs} onToggle={toggle} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="sticky-action">
        <button className="btn-primary" onClick={() => navigate('q3')}>Next →</button>
      </div>
    </div>
  );
}
