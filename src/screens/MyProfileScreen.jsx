import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';
import Avatar from '../components/ui/Avatar';

export default function MyProfileScreen() {
  const { state, dispatch, navigate } = useApp();
  const { userName, age, avatarIdx, prefs, locations } = state;

  const displayName = userName || 'You';
  const displayAge  = age     || '28';
  const displayCity = locations[0] || 'Tel Aviv';

  const preferenceTags = [
    ...prefs.slice(0, 3),
    ...locations.slice(0, 1),
    '🎵 Indie concerts',
    '☕ Coffee lover',
  ].filter(Boolean).slice(0, 5);

  const stats = [
    { n: '12', label: 'Matches found' },
    { n: '3',  label: 'Meetups done'  },
    { n: '5★', label: 'Avg rating'    },
  ];

  const newSearch = () => {
    dispatch({ type: 'RESET_QUESTIONNAIRE' });
    navigate('q1');
  };

  return (
    <div className="screen overflow-y-auto">
      {/* Hero */}
      <div
        className="h-[210px] relative"
        style={{ background: 'linear-gradient(160deg, #1e1b4b, #4c1d95, #7c2d92)' }}
      >
        <StatusBar light />
        <button
          className="absolute top-[54px] right-5 border-0 cursor-pointer rounded-xl px-[18px] py-2 text-white text-[13px] font-bold"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', fontFamily: 'inherit' }}
          onClick={() => navigate('signup')}
        >
          Edit
        </button>
      </div>

      {/* Avatar + stats overlap */}
      <div className="flex justify-between items-end px-6 -mt-[46px]">
        <div className="rounded-full border-4 border-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
          <Avatar idx={avatarIdx} size={90} />
        </div>
        <div className="flex gap-2 mb-2.5">
          {[['12', 'Matches'], ['3', 'Meetups'], ['5★', 'Rating']].map(([n, l]) => (
            <div key={l} className="text-center bg-white rounded-2xl px-3 py-2.5" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="text-[18px] font-extrabold" style={{ color: '#7C3AED' }}>{n}</div>
              <div className="text-[10px] text-gray-400 font-semibold">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-12 pt-4">
        <h2 className="text-[24px] font-extrabold text-gray-900 tracking-[-0.4px] mb-0.5">
          {displayName}
        </h2>
        <p className="text-gray-500 text-sm mb-5">{displayAge} years old · {displayCity}</p>

        {/* Preferences */}
        <div className="bg-white rounded-3xl p-[18px] mb-3.5 border border-gray-100">
          <p className="text-[12px] font-extrabold text-gray-500 uppercase tracking-[0.5px] mb-3.5">
            My Preferences
          </p>
          <div className="flex flex-wrap gap-2">
            {preferenceTags.map(tag => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>

        {/* Activity stats */}
        <div className="rounded-3xl p-[18px] mb-5" style={{ background: 'linear-gradient(135deg, #ede9fe, #fce7f3)' }}>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.5px] mb-3.5" style={{ color: '#7C3AED' }}>
            Activity Stats
          </p>
          <div className="flex gap-2">
            {stats.map(({ n, label }) => (
              <div key={label} className="flex-1 text-center bg-white rounded-2xl py-3" style={{ boxShadow: '0 2px 8px rgba(124,58,237,0.1)' }}>
                <div className="text-[20px] font-extrabold mb-0.5" style={{ color: '#7C3AED' }}>{n}</div>
                <div className="text-[10px] text-gray-500 font-semibold leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary mb-3" onClick={newSearch}>🔍 Start New Search</button>
        <button className="btn-secondary">⚙️ Settings</button>

        <button
          className="block w-full text-center mt-5 bg-transparent border-0 cursor-pointer text-sm font-bold"
          style={{ color: '#ef4444', fontFamily: 'inherit' }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
