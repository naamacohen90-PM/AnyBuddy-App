import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import StatusBar from '../components/ui/StatusBar';

const SLIDES = [
  {
    emoji: '🎯',
    title: 'Smart Matching',
    sub: 'Answer a quick questionnaire and we match you with people who want to do the same thing, at the same time, near you.',
    bg: 'linear-gradient(160deg, #1e1b4b, #4c1d95, #7c2d92)',
  },
  {
    emoji: '🤝',
    title: 'Real Connections',
    sub: "No endless swiping. Meet people with shared interests, in your area, at the right time. It's that simple.",
    bg: 'linear-gradient(160deg, #0f172a, #1e3a5f, #0e7490)',
  },
  {
    emoji: '🚀',
    title: 'Do Life Together',
    sub: 'Concerts, hikes, dining, travel — AnyBuddy connects you to your next great experience with the right person.',
    bg: 'linear-gradient(160deg, #2d1b00, #7c2d12, #be123c)',
  },
];

export default function OnboardingScreen() {
  const { navigate } = useApp();
  const [current, setCurrent] = useState(0);

  const slide = SLIDES[current];

  const next = () => {
    if (current < SLIDES.length - 1) setCurrent(c => c + 1);
    else navigate('signup');
  };

  return (
    <div className="screen flex flex-col" style={{ background: slide.bg, transition: 'background 0.5s ease' }}>
      <StatusBar light />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-9 pt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[84px] mb-9"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}
          >
            {slide.emoji}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-white text-[30px] font-extrabold tracking-[-0.5px] mb-4">
              {slide.title}
            </h2>
            <p className="text-white/75 text-base leading-[1.65]">
              {slide.sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center pb-8 pt-8">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className="h-2 rounded-full cursor-pointer transition-all duration-300"
            style={{
              width: i === current ? 28 : 8,
              background: i === current ? 'white' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="px-6 pb-12 flex flex-col gap-3">
        {current < SLIDES.length - 1 ? (
          <>
            <button
              className="btn-primary"
              style={{
                background: 'rgba(255,255,255,0.22)',
                border: '2px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
              }}
              onClick={next}
            >
              Next →
            </button>
            <button className="btn-ghost" onClick={() => navigate('signup')}>Skip</button>
          </>
        ) : (
          <button
            className="btn-primary"
            style={{ background: 'white', color: '#7C3AED' }}
            onClick={() => navigate('signup')}
          >
            Get Started 🎉
          </button>
        )}
      </div>
    </div>
  );
}
