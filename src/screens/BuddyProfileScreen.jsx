import { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';
import BackButton from '../components/ui/BackButton';
import Avatar from '../components/ui/Avatar';

export default function BuddyProfileScreen() {
  const { state, dispatch, navigate, goBack } = useApp();
  const profile = state.selectedProfile;
  const [chatStarted, setChatStarted] = useState(false);

  if (!profile) return null;

  const handleChat = () => {
    setChatStarted(true);
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: profile.id });
    setTimeout(() => navigate('chat'), 600);
  };

  return (
    <div className="screen overflow-y-auto">
      {/* Hero bg */}
      <div
        className="h-[210px] relative"
        style={{ background: 'linear-gradient(160deg, #1e1b4b, #4c1d95, #7c2d92)' }}
      >
        <StatusBar light />
        <div className="absolute top-[52px] left-5">
          <BackButton light onBack={goBack} />
        </div>
      </div>

      {/* Avatar overlap */}
      <div className="flex justify-between items-end px-6 -mt-[46px]">
        <div className="rounded-full border-4 border-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
          <Avatar idx={profile.avatarIdx} size={90} />
        </div>
        <div className="match-badge text-[14px] px-4 py-1.5 mb-2.5">{profile.match}% match</div>
      </div>

      <div className="px-6 pb-12 pt-4">
        <h2 className="text-[26px] font-extrabold text-gray-900 tracking-[-0.4px] mb-1">
          {profile.name}, {profile.age}
        </h2>
        <div className="flex items-center gap-1 mb-5">
          <svg width="13" height="15" viewBox="0 0 13 15" fill="#9ca3af">
            <path d="M6.5.5C4.3.5 2.5 2.3 2.5 4.5c0 3 4 9.5 4 9.5s4-6.5 4-9.5C10.5 2.3 8.7.5 6.5.5z"/>
            <circle cx="6.5" cy="4.5" r="1.5" fill="#fafafa"/>
          </svg>
          <span className="text-[14px] text-gray-500">{profile.city}</span>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-3xl p-4 mb-4 border border-gray-100">
          <p className="text-[14px] text-gray-600 leading-[1.65]">{profile.bio}</p>
        </div>

        {/* Shared interests */}
        <div className="rounded-3xl p-[18px] mb-6" style={{ background: 'linear-gradient(135deg, #ede9fe, #fce7f3)' }}>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.5px] mb-3" style={{ color: '#7C3AED' }}>
            ✨ You both love
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.tags.map(tag => (
              <span key={tag} className="tag-pill-white">{tag}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {!chatStarted ? (
          <button className="btn-primary mb-3" onClick={handleChat}>
            💬 Start a Conversation
          </button>
        ) : (
          <div className="rounded-2xl px-4 py-4 text-center mb-3" style={{ background: '#ecfdf5' }}>
            <span className="text-[15px] font-bold" style={{ color: '#059669' }}>
              ✅ Chat started! Redirecting...
            </span>
          </div>
        )}
        <button className="btn-secondary mb-0" onClick={goBack}>← Back to results</button>

        <div className="text-center mt-5">
          <button
            className="bg-transparent border-0 cursor-pointer text-[13px] text-gray-400"
            style={{ fontFamily: 'inherit' }}
          >
            🚩 Report this user
          </button>
        </div>
      </div>
    </div>
  );
}
