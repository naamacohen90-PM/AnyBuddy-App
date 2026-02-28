import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import BottomNav from './components/layout/BottomNav';

// Screens
import SplashScreen       from './screens/SplashScreen';
import OnboardingScreen   from './screens/OnboardingScreen';
import SignUpScreen       from './screens/SignUpScreen';
import Step1Activity      from './screens/questionnaire/Step1Activity';
import Step2Prefs         from './screens/questionnaire/Step2Prefs';
import Step3Location      from './screens/questionnaire/Step3Location';
import Step4Dates         from './screens/questionnaire/Step4Dates';
import MatchResultsScreen from './screens/MatchResultsScreen';
import BuddyProfileScreen from './screens/BuddyProfileScreen';
import ChatsListScreen    from './screens/ChatsListScreen';
import ChatScreen         from './screens/ChatScreen';
import MyProfileScreen    from './screens/MyProfileScreen';

const NAV_SCREENS = ['results', 'profile', 'chats', 'chat', 'myprofile'];

const SCREEN_MAP = {
  splash:     SplashScreen,
  onboarding: OnboardingScreen,
  signup:     SignUpScreen,
  q1:         Step1Activity,
  q2:         Step2Prefs,
  q3:         Step3Location,
  q4:         Step4Dates,
  results:    MatchResultsScreen,
  profile:    BuddyProfileScreen,
  chats:      ChatsListScreen,
  chat:       ChatScreen,
  myprofile:  MyProfileScreen,
};

const SCREEN_ORDER = [
  'splash', 'onboarding', 'signup',
  'q1', 'q2', 'q3', 'q4',
  'results', 'profile',
  'chats', 'chat',
  'myprofile',
];

const slideVariants = {
  enter:  (d) => ({ x: d > 0 ? '100%' : '-30%', opacity: 0 }),
  center: ()  => ({ x: 0, opacity: 1 }),
  exit:   (d) => ({ x: d > 0 ? '-30%' : '100%', opacity: 0 }),
};

function AppInner() {
  const { state } = useApp();
  const { screen, history } = state;

  const ScreenComponent = SCREEN_MAP[screen] || SplashScreen;
  const showNav = NAV_SCREENS.includes(screen);

  const prevScreen = history[history.length - 1];
  const prevOrder  = SCREEN_ORDER.indexOf(prevScreen ?? '');
  const currOrder  = SCREEN_ORDER.indexOf(screen);
  const direction  = prevOrder === -1 ? 1 : currOrder >= prevOrder ? 1 : -1;

  return (
    <div className="phone-frame flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={screen}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <ScreenComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showNav && (
          <motion.div
            key="bottomnav"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <BottomNav />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
