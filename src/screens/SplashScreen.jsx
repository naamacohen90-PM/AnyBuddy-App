import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';

export default function SplashScreen() {
  const { navigate } = useApp();

  useEffect(() => {
    const t = setTimeout(() => navigate('onboarding'), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen flex flex-col items-center justify-center"
         style={{ background: 'linear-gradient(160deg, #1e1b4b 0%, #4c1d95 50%, #7c2d92 100%)' }}>
      <StatusBar light />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="mb-7"
      >
        <div className="w-[104px] h-[104px] rounded-[28px] flex items-center justify-center"
             style={{
               background: 'linear-gradient(135deg, #a78bfa, #f0abfc)',
               boxShadow: '0 20px 48px rgba(167,139,250,0.55)',
             }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <ellipse cx="28" cy="20" rx="12" ry="12" fill="white" fillOpacity=".95"/>
            <circle cx="12" cy="38" r="7" fill="white" fillOpacity=".6"/>
            <circle cx="44" cy="36" r="8" fill="white" fillOpacity=".7"/>
            <line x1="20" y1="30" x2="12" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity=".7"/>
            <line x1="36" y1="29" x2="44" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity=".7"/>
          </svg>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-white font-black text-[40px] tracking-[-1.5px] mb-3"
      >
        AnyBuddy
      </motion.h1>

      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-white/70 text-[15px] text-center px-10 leading-relaxed"
      >
        Find the right person<br/>for the right moment
      </motion.p>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-2 mt-16"
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/80"
            style={{
              animation: `splash-pulse ${0.9 + i * 0.15}s ease-in-out ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
      </motion.div>

      <style>{`
        @keyframes splash-pulse {
          from { opacity: 0.25; transform: scale(0.8); }
          to   { opacity: 1;    transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
