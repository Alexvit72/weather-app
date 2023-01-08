import { configureStore } from '@reduxjs/toolkit';
import currentReducer from '../features/current/currentSlice'
import forecastReducer from '../features/forecast/forecastSlice'
import townsReducer from '../features/towns/townsSlice'

export const store = configureStore({
  reducer: {
    current: currentReducer,
    forecast: forecastReducer,
    towns: townsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
