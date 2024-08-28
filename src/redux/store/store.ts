// src/store.ts
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import movieAppReducer from '../slice/movieAppSlice';
import userReducer from '../slice/userSlice'; // Import the user slice

const store = configureStore({
  reducer: {
    movieData: movieAppReducer, // Keep your existing movie app reducer
    user: userReducer, // Add the user reducer here
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

