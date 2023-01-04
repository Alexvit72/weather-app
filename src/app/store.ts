import { configureStore } from '@reduxjs/toolkit';
import currentReducer from '../features/current/currentSlice'

export const store = configureStore({
  reducer: {
    current: currentReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
