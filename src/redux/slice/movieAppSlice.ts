import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem } from '../../components/BannerBrowse';

interface MovieAppState {
  bannerData: any[];
  imageUrl: string;
  watchlist: MediaItem[];
}

// Load initial state from localStorage or use empty array if not present
const loadWatchlistFromLocalStorage = (): MediaItem[] => {
  const savedWatchlist = localStorage.getItem('watchlist');
  return savedWatchlist ? JSON.parse(savedWatchlist) : [];
};

const initialState: MovieAppState = {
  bannerData: [],
  imageUrl: '',
  watchlist: loadWatchlistFromLocalStorage(),
};

const saveWatchlistToLocalStorage = (watchlist: MediaItem[]) => {
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
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
    addToWatchlist: (state, action: PayloadAction<MediaItem>) => {
      // Avoid adding duplicates
      if (!state.watchlist.some(item => item.id === action.payload.id)) {
        state.watchlist.push(action.payload);
        saveWatchlistToLocalStorage(state.watchlist);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlist = state.watchlist.filter(item => item.id !== action.payload);
      saveWatchlistToLocalStorage(state.watchlist);
    },
  },
});

export const { setBannerData, setImageUrl, addToWatchlist, removeFromWatchlist } = movieAppSlice.actions;

export default movieAppSlice.reducer;





