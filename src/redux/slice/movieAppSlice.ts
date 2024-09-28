import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem } from '../../components/BannerBrowse';

// Define the shape of your state
interface MovieAppState {
  bannerData: any[];
  imageUrl: string;
  watchlists: { [userId: string]: MediaItem[] }; // Change this to a mapping of user IDs to watchlists
}

// Load initial state from localStorage or use an empty object if not present
const loadWatchlistFromLocalStorage = (): { [userId: string]: MediaItem[] } => {
  const savedWatchlists = localStorage.getItem('watchlists');
  return savedWatchlists ? JSON.parse(savedWatchlists) : {};
};

// Call loadWatchlistFromLocalStorage to initialize state
const initialState: MovieAppState = {
  bannerData: [],
  imageUrl: '',
  watchlists: loadWatchlistFromLocalStorage(), // Use the function here
};

const saveWatchlistToLocalStorage = (watchlists: { [userId: string]: MediaItem[] }) => {
  localStorage.setItem('watchlists', JSON.stringify(watchlists)); // Save the entire watchlists object
};

export const movieAppSlice = createSlice({
  name: 'movieapp',
  initialState,
  reducers: {
    setBannerData: (state, action: PayloadAction<any[]>) => {
      state.bannerData = action.payload;
    },
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    addToWatchlist: (state, action: PayloadAction<{ userId: string; mediaItem: MediaItem }>) => {
      const { userId, mediaItem } = action.payload;
      if (!state.watchlists[userId]) {
        state.watchlists[userId] = [];
      }
      // Avoid duplicates
      if (!state.watchlists[userId].some(item => item.id === mediaItem.id)) {
        state.watchlists[userId].push(mediaItem);
        saveWatchlistToLocalStorage(state.watchlists); // Save updated watchlist to localStorage
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<{ userId: string; itemId: number }>) => {
      const { userId, itemId } = action.payload;
      if (state.watchlists[userId]) {
        state.watchlists[userId] = state.watchlists[userId].filter(item => item.id !== itemId);
        saveWatchlistToLocalStorage(state.watchlists); // Save updated watchlist to localStorage
      }
    },
  },
});

export const { setBannerData, setImageUrl, addToWatchlist, removeFromWatchlist } = movieAppSlice.actions;

export default movieAppSlice.reducer;







