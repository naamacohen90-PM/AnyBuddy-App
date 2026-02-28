export default function StatusBar({ light = false }) {
  const color = light ? '#fff' : '#111827';
  return (
    <div className="status-bar" style={{ color }}>
      <span>9:41</span>
      <span className="flex gap-1.5 items-center">
        {/* Signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={color}>
          <rect x="0" y="3" width="3" height="8" rx="1"/>
          <rect x="4" y="1" width="3" height="10" rx="1"/>
          <rect x="8" y="0" width="3" height="11" rx="1"/>
          <rect x="12" y="0" width="3" height="11" rx="1" opacity=".4"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke={color} strokeOpacity=".35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill={color}/>
          <path d="M23 4.5v3a1.5 1.5 0 000-3z" fill={color} fillOpacity=".4"/>
        </svg>
      </span>
    </div>
  );
}
