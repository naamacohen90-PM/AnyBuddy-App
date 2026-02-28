import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';
import Avatar from '../components/ui/Avatar';
import { AVATAR_GRADIENTS, AVATAR_INITIALS } from '../data/activities';

export default function SignUpScreen() {
  const { state, dispatch, navigate } = useApp();
  const { userName, age, gender, avatarIdx } = state;

  const canProceed = userName.trim() && age && gender;

  const set = (payload) => dispatch({ type: 'SET_USER', payload });

  return (
    <div className="screen">
      <StatusBar />
      <div className="pt-14 px-6 pb-10">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-[28px] font-extrabold text-gray-900 tracking-[-0.5px] mb-1.5">
            Create your profile
          </h1>
          <p className="text-gray-500 text-[15px]">Just the basics — no dating profiles here</p>
        </div>

        {/* Avatar picker */}
        <div className="mb-6">
          <label className="block text-[13px] font-bold text-gray-600 uppercase tracking-[0.5px] mb-3">
            Choose your avatar
          </label>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {AVATAR_INITIALS.map((_, i) => (
              <div
                key={i}
                onClick={() => set({ avatarIdx: i })}
                className="cursor-pointer flex-shrink-0 rounded-full transition-all duration-200"
                style={{
                  padding: 3,
                  border: `3px solid ${i === avatarIdx ? '#7C3AED' : 'transparent'}`,
                }}
              >
                <Avatar idx={i} size={52} />
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <label className="block text-[13px] font-bold text-gray-600 mb-2">Full Name</label>
            <input
              className="input-field"
              placeholder="Your name"
              value={userName}
              onChange={e => set({ userName: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-600 mb-2">Age</label>
            <input
              className="input-field"
              placeholder="Your age"
              type="number"
              min="18"
              max="65"
              value={age}
              onChange={e => set({ age: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-600 mb-2">I identify as</label>
            <div className="flex gap-2.5">
              {['Man', 'Woman', 'Non-binary'].map(g => (
                <button
                  key={g}
                  onClick={() => set({ gender: g })}
                  className="flex-1 py-3 rounded-[13px] text-[13px] font-bold cursor-pointer transition-all duration-150"
                  style={{
                    border: `2px solid ${gender === g ? '#7C3AED' : '#e5e7eb'}`,
                    background: gender === g ? '#ede9fe' : 'white',
                    color: gender === g ? '#7C3AED' : '#374151',
                    fontFamily: 'inherit',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn-primary mb-4"
          disabled={!canProceed}
          onClick={() => canProceed && navigate('q1')}
        >
          Continue →
        </button>

        <p className="text-center text-[12px] text-gray-400">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
