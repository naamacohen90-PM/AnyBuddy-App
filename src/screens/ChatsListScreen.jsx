import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';
import Avatar from '../components/ui/Avatar';
import { PROFILES } from '../data/profiles';
import { CHATS_LIST, INITIAL_MESSAGES } from '../data/chats';

export default function ChatsListScreen() {
  const { state, dispatch, navigate } = useApp();
  const { messages } = state;

  const openChat = (chat) => {
    const profile = PROFILES.find(p => p.id === chat.profileId);
    dispatch({ type: 'SET_PROFILE', payload: profile });
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: chat.id });
    navigate('chat');
  };

  return (
    <div className="screen">
      <StatusBar />
      <div className="pt-14 px-6 pb-4">
        <h2 className="text-[26px] font-extrabold text-gray-900 tracking-[-0.4px] mb-1">
          Messages 💬
        </h2>
        <p className="text-gray-500 text-sm">Your active buddy conversations</p>
      </div>

      <div className="px-6 pb-24 flex flex-col gap-3">
        {CHATS_LIST.map(chat => {
          const profile = PROFILES.find(p => p.id === chat.profileId);
          const chatMsgs = messages[chat.id] || INITIAL_MESSAGES[chat.id] || [];
          const lastMsg = chatMsgs[chatMsgs.length - 1]?.text || chat.lastMessage;

          return (
            <div
              key={chat.id}
              onClick={() => openChat(chat)}
              className="flex gap-3.5 p-4 bg-white rounded-3xl cursor-pointer transition-transform duration-150 hover:-translate-y-0.5"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              {/* Avatar + unread */}
              <div className="relative flex-shrink-0">
                <Avatar idx={profile.avatarIdx} size={52} />
                {chat.unread > 0 && (
                  <div
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white border-2 border-white"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
                  >
                    {chat.unread}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[15px] font-bold text-gray-900">{profile.name}</span>
                  <span className="text-[12px] text-gray-400">{chat.time}</span>
                </div>
                <div className="inline-block bg-[#ede9fe] rounded-full px-2 py-0.5 mb-1.5">
                  <span className="text-[11px] font-bold text-[#7C3AED]">{chat.shared}</span>
                </div>
                <p
                  className="text-[13px] truncate"
                  style={{ color: chat.unread ? '#374151' : '#9ca3af', fontWeight: chat.unread ? 600 : 400 }}
                >
                  {lastMsg}
                </p>
              </div>
            </div>
          );
        })}

        {CHATS_LIST.length === 0 && (
          <div className="text-center py-16">
            <div className="text-[60px] mb-4">👋</div>
            <p className="text-[16px] font-bold text-gray-700">No chats yet</p>
            <p className="text-sm text-gray-400 mt-2">Find a buddy and start a conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
}
