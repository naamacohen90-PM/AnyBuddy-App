import { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_MESSAGES } from '../data/chats';
import { PREFS } from '../data/activities';

/* ─── HELPER: flatten all pref strings for a given activity ID ─── */
function flattenPrefs(id) {
  const p = PREFS[id];
  if (!p) return [];
  if (Array.isArray(p)) return p;
  return Object.values(p).flat();
}

/* ─── INITIAL STATE ─── */
const initialState = {
  // Navigation
  screen: 'splash',
  history: [],

  // User profile
  userName: '',
  age:      '',
  gender:   '',
  avatarIdx: 0,

  // Questionnaire
  activities: [],    // array of selected IDs: ['concert', 'hiking', ...]
  prefs:      [],    // selected genres/artists/hike types/etc
  locations: [],     // selected cities
  dates:     [],     // selected date strings

  // Social
  selectedProfile: null,
  activeChatId:    null,
  messages:        INITIAL_MESSAGES,
};

/* ─── LOAD FROM localStorage ─── */
function loadState() {
  try {
    const raw = localStorage.getItem('anybuddy_state');
    if (!raw) return initialState;
    const saved = JSON.parse(raw);
    // Always restart from splash, preserve user data only
    return {
      ...initialState,
      userName:  saved.userName  || '',
      age:       saved.age       || '',
      gender:    saved.gender    || '',
      avatarIdx: saved.avatarIdx ?? 0,
      messages:  saved.messages  || INITIAL_MESSAGES,
    };
  } catch {
    return initialState;
  }
}

/* ─── REDUCER ─── */
function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE': {
      const history = action.isBack
        ? state.history.slice(0, -1)
        : [...state.history, state.screen];
      return { ...state, screen: action.to, history };
    }
    case 'GO_BACK': {
      const prev = state.history[state.history.length - 1];
      if (!prev) return state;
      return { ...state, screen: prev, history: state.history.slice(0, -1) };
    }
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'TOGGLE_ACTIVITY': {
      const id = action.payload;
      const isSelected = state.activities.includes(id);
      if (isSelected) {
        // Deselect: remove activity and strip its prefs from the prefs array
        const actPrefs = flattenPrefs(id);
        return {
          ...state,
          activities: state.activities.filter(a => a !== id),
          prefs: state.prefs.filter(p => !actPrefs.includes(p)),
        };
      }
      return { ...state, activities: [...state.activities, id] };
    }
    case 'TOGGLE_PREF': {
      const p = action.payload;
      const prefs = state.prefs.includes(p)
        ? state.prefs.filter(x => x !== p)
        : [...state.prefs, p];
      return { ...state, prefs };
    }
    case 'TOGGLE_LOCATION': {
      const loc = action.payload;
      const locations = state.locations.includes(loc)
        ? state.locations.filter(x => x !== loc)
        : [...state.locations, loc];
      return { ...state, locations };
    }
    case 'TOGGLE_DATE': {
      const d = action.payload;
      const dates = state.dates.includes(d)
        ? state.dates.filter(x => x !== d)
        : [...state.dates, d];
      return { ...state, dates };
    }
    case 'SET_PROFILE':
      return { ...state, selectedProfile: action.payload };
    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChatId: action.payload };
    case 'SEND_MESSAGE': {
      const { chatId, message } = action.payload;
      const existing = state.messages[chatId] || [];
      return {
        ...state,
        messages: { ...state.messages, [chatId]: [...existing, message] },
      };
    }
    case 'RESET_QUESTIONNAIRE':
      return { ...state, activities: [], prefs: [], locations: [], dates: [] };
    default:
      return state;
  }
}

/* ─── CONTEXT ─── */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  // Persist relevant state to localStorage
  useEffect(() => {
    const { userName, age, gender, avatarIdx, messages } = state;
    localStorage.setItem('anybuddy_state', JSON.stringify({ userName, age, gender, avatarIdx, messages }));
  }, [state.userName, state.age, state.gender, state.avatarIdx, state.messages]);

  const navigate = (to) => dispatch({ type: 'NAVIGATE', to });
  const goBack   = ()   => dispatch({ type: 'GO_BACK' });

  return (
    <AppContext.Provider value={{ state, dispatch, navigate, goBack }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
