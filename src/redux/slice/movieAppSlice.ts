import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MediaItem } from '../../components/BannerBrowse';

interface MovieAppState {
  bannerData: any[];
  imageUrl: string;
  watchlist: MediaItem[]; // Add watchlist to state
}

const initialState: MovieAppState = {
  bannerData: [],
  imageUrl: '',
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]') // Load watchlist from localStorage
}

export const movieAppSlice = createSlice({
  name: 'movieapp',
  initialState,
  reducers: {
    setBannerData: (state, action: PayloadAction<any[]>) => {
      state.bannerData = action.payload
    },
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload
    },
    addToWatchlist: (state, action: PayloadAction<MediaItem>) => {
      // Check if item already exists in watchlist
      const itemExists = state.watchlist.some(item => item.id === action.payload.id);
      if (!itemExists) {
        state.watchlist.push(action.payload);
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      // Remove item from watchlist and save to localStorage
      state.watchlist = state.watchlist.filter(item => item.id !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    }
  }
})

export const { setBannerData, setImageUrl, addToWatchlist, removeFromWatchlist } = movieAppSlice.actions

export default movieAppSlice.reducer


