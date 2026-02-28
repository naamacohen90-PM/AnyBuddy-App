export const ACTIVITIES = [
  { id: 'concert',  label: 'Concert',  emoji: '🎵', color: '#7C3AED' },
  { id: 'hiking',   label: 'Hiking',   emoji: '🏔️', color: '#10b981' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘', color: '#06b6d4' },
  { id: 'sports',   label: 'Sports',   emoji: '⚽', color: '#f59e0b' },
  { id: 'dining',   label: 'Dining',   emoji: '🍽️', color: '#ef4444' },
  { id: 'travel',   label: 'Travel',   emoji: '✈️', color: '#8b5cf6' },
];

export const PREFS = {
  concert: {
    genres:  ['Indie', 'Rock', 'Pop', 'Electronic', 'Jazz', 'Hip-Hop', 'R&B', 'Classical', 'Metal', 'Folk'],
    artists: ['Coldplay', 'Radiohead', 'Daft Punk', 'Beyoncé', 'Kendrick Lamar', 'Taylor Swift', 'The 1975', 'Arctic Monkeys', 'Billie Eilish', 'Frank Ocean'],
  },
  hiking: {
    types:        ['Day hike', 'Multi-day', 'Trail run', 'Photography walk', 'Family hike'],
    destinations: ['Galil', 'Negev', 'Golan', 'Carmel', 'Dead Sea', 'Europe', 'SE Asia', 'Americas'],
  },
  wellness: ['Yoga', 'Meditation', 'Pilates', 'Gym', 'CrossFit', 'Swimming', 'Cycling', 'Running'],
  sports:   ['Football', 'Basketball', 'Tennis', 'Padel', 'Running', 'Cycling', 'Swimming', 'CrossFit'],
  dining:   ['Italian', 'Japanese', 'Mediterranean', 'Thai', 'Israeli', 'French', 'American', 'Vegan'],
  travel:   ['Backpacking', 'Luxury', 'Adventure', 'Cultural', 'Beach', 'City break', 'Road trip', 'Nature'],
};

export const LOCATIONS = [
  'Tel Aviv', 'Jerusalem', 'Haifa', 'Beer Sheva', 'Eilat',
  'Ramat Gan', 'Herzliya', 'London', 'Berlin', 'Barcelona',
];

export const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #7C3AED, #EC4899)',
  'linear-gradient(135deg, #10b981, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #8b5cf6, #EC4899)',
  'linear-gradient(135deg, #06b6d4, #7C3AED)',
  'linear-gradient(135deg, #ef4444, #f59e0b)',
];

export const AVATAR_INITIALS = ['NO', 'MS', 'YK', 'RL', 'DG', 'AB'];
