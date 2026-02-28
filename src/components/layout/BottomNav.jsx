import { useApp } from '../../context/AppContext';

const NAV_SCREENS_DISCOVER = ['results', 'profile'];

export default function BottomNav() {
  const { state, navigate } = useApp();
  const { screen } = state;

  const isDiscover = NAV_SCREENS_DISCOVER.includes(screen) || screen === 'q1';
  const isChats    = screen === 'chats' || screen === 'chat';
  const isProfile  = screen === 'myprofile';

  return (
    <div className="bottom-nav">
      <button className={`nav-item ${isDiscover ? 'active' : ''}`} onClick={() => navigate('results')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2.2"/>
          <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
        Discover
      </button>

      <button className={`nav-item ${isChats ? 'active' : ''}`} onClick={() => navigate('chats')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M18 3H4a2 2 0 00-2 2v10a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2V5a2 2 0 00-2-2z"
                stroke="currentColor" strokeWidth="2.2"
                fill={isChats ? '#ede9fe' : 'none'}/>
        </svg>
        Messages
      </button>

      <button className={`nav-item ${isProfile ? 'active' : ''}`} onClick={() => navigate('myprofile')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="2.2"
                  fill={isProfile ? '#ede9fe' : 'none'}/>
          <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
        Profile
      </button>
    </div>
  );
}
