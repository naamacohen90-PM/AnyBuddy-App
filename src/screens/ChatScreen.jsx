import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';
import BackButton from '../components/ui/BackButton';
import Avatar from '../components/ui/Avatar';
import { PROFILES } from '../data/profiles';
import { CHATS_LIST, INITIAL_MESSAGES, AUTO_REPLIES } from '../data/chats';

export default function ChatScreen() {
  const { state, dispatch, goBack } = useApp();
  const { activeChatId, selectedProfile, messages } = state;

  const chatId = activeChatId || 1;
  const profile = selectedProfile || PROFILES[0];
  const chatMeta = CHATS_LIST.find(c => c.id === chatId) || CHATS_LIST[0];
  const chatMessages = messages[chatId] || INITIAL_MESSAGES[chatId] || [];

  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        chatId,
        message: { id: Date.now(), me: true, text, time: now },
      },
    });

    // Auto-reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const now2 = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      dispatch({
        type: 'SEND_MESSAGE',
        payload: {
          chatId,
          message: { id: Date.now() + 1, me: false, text: reply, time: now2 },
        },
      });
    }, 1100 + Math.random() * 600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="screen flex flex-col">
      {/* Header */}
      <div className="pt-[52px] px-4 pb-3 bg-white border-b border-gray-100 flex items-center gap-3 flex-shrink-0 relative">
        <StatusBar />
        <BackButton onBack={goBack} />
        <Avatar idx={profile.avatarIdx} size={42} />
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold text-gray-900">{profile.name}</div>
          <div className="text-[12px] font-bold truncate" style={{ color: '#7C3AED' }}>
            ✨ {chatMeta?.shared || 'Shared interests'}
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(v => !v)}
            className="p-1.5 bg-transparent border-0 cursor-pointer rounded-full hover:bg-gray-50"
            aria-label="More options"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#9ca3af">
              <circle cx="10" cy="4" r="1.8"/>
              <circle cx="10" cy="10" r="1.8"/>
              <circle cx="10" cy="16" r="1.8"/>
            </svg>
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-9 bg-white rounded-2xl z-50 py-1.5 min-w-[160px]"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
            >
              {[
                { label: '🔇 Mute notifications', danger: false },
                { label: `🚫 Block ${profile.name.split(' ')[0]}`, danger: true },
                { label: '🚩 Report user', danger: true },
              ].map(item => (
                <div
                  key={item.label}
                  onClick={() => setShowMenu(false)}
                  className="px-4 py-3 text-[14px] font-medium cursor-pointer hover:bg-gray-50"
                  style={{ color: item.danger ? '#ef4444' : '#374151' }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5">
        {chatMessages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.me ? 'items-end' : 'items-start'}`}>
            <div className={msg.me ? 'bubble-me' : 'bubble-them'}>{msg.text}</div>
            <span className="text-[10px] text-gray-400 mt-0.5 mx-1">{msg.time}</span>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-1.5">
            <div className="bubble-them flex gap-1 items-center px-4 py-3">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gray-400"
                  style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="px-4 pb-7 pt-2 bg-white border-t border-gray-100 flex gap-2.5 items-end flex-shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Message..."
          className="flex-1 px-4 py-2.5 rounded-3xl border-2 border-gray-200 text-sm bg-[#f9fafb] outline-none transition-colors"
          style={{ fontFamily: 'inherit' }}
          onFocus={e => e.target.style.borderColor = '#7C3AED'}
          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
        />
        <button
          onClick={sendMessage}
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-0 cursor-pointer transition-opacity"
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            opacity: input.trim() ? 1 : 0.55,
          }}
          aria-label="Send"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M16 9L2 2l2.5 7L2 16l14-7z" fill="white"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
