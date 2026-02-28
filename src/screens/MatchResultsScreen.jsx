import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';
import Avatar from '../components/ui/Avatar';
import { PROFILES } from '../data/profiles';
import { ACTIVITIES } from '../data/activities';

const FILTERS = ['All', 'Tel Aviv', 'Jerusalem', 'Haifa'];

export default function MatchResultsScreen() {
  const { state, dispatch, navigate } = useApp();
  const { activities } = state;
  const [filter, setFilter] = useState('All');

  const actLabels = activities
    .map(id => ACTIVITIES.find(a => a.id === id)?.label)
    .filter(Boolean)
    .join(' · ') || 'Activity';

  const openProfile = (profile) => {
    dispatch({ type: 'SET_PROFILE', payload: profile });
    navigate('profile');
  };

  const filtered = filter === 'All'
    ? PROFILES
    : PROFILES.filter(p => p.city === filter);

  return (
    <div className="screen">
      <StatusBar />

      {/* Header */}
      <div className="pt-14 px-6">
        <h2 className="text-[26px] font-extrabold text-gray-900 tracking-[-0.4px] mb-1">
          Your Matches ✨
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          {filtered.length} buddies found · {actLabels} · Tel Aviv
        </p>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-3">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`chip flex-shrink-0 ${filter === f ? 'chip-selected' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="px-6 pb-24 flex flex-col gap-4 pt-2">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
          >
            <div className="profile-card" onClick={() => openProfile(p)}>
              {/* Card top */}
              <div className="p-[18px] pb-3 flex gap-3.5">
                <div className="relative flex-shrink-0">
                  <Avatar idx={p.avatarIdx} size={64} />
                  <div className="match-badge absolute -bottom-2 left-1/2 -translate-x-1/2">
                    {p.match}%
                  </div>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[17px] font-bold text-gray-900">{p.name}</span>
                    <span className="text-sm text-gray-400">{p.age}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <svg width="11" height="13" viewBox="0 0 11 13" fill="#9ca3af">
                      <path d="M5.5.5C3.6.5 2 2.1 2 4c0 2.7 3.5 8 3.5 8S9 6.7 9 4C9 2.1 7.4.5 5.5.5z"/>
                      <circle cx="5.5" cy="4" r="1.3" fill="#fafafa"/>
                    </svg>
                    <span className="text-[12px] text-gray-400">{p.city}</span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-snug line-clamp-2">{p.bio}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="px-[18px] pb-[14px] pt-2.5 border-t border-gray-50 flex flex-wrap gap-1.5">
                {p.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
