import { AVATAR_GRADIENTS, AVATAR_INITIALS } from '../../data/activities';

export default function Avatar({ idx = 0, size = 44, className = '' }) {
  return (
    <div
      className={`rounded-full flex items-center justify-center font-extrabold text-white flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length],
        fontSize: size * 0.37,
      }}
    >
      {AVATAR_INITIALS[idx % AVATAR_INITIALS.length]}
    </div>
  );
}
