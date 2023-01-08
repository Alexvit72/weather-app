import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store';
import { Town } from '../../interfaces/towns';

// Define a type for the slice state
interface townsState {
  currentTown: Town | null,
  towns: Town[]
}

// Define the initial state using that type
const initialState: townsState = {
  currentTown: null,
  towns: []
};

export const townsSlice = createSlice({
  name: 'towns',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentTown: (state, action: PayloadAction<Town>) => {
      state.currentTown = action.payload;
    },
    addTown: (state, action: PayloadAction<Town>) => {
      if (!state.towns.find(item => item.id == action.payload.id)) {
        state.towns.push(action.payload);
        localStorage.setItem('towns-for-weather-app', JSON.stringify(state.towns));
      }
    },
    removeTown: (state, action: PayloadAction<Town>) => {
      state.towns = state.towns.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('towns-for-weather-app', JSON.stringify(state.towns));
    },
    setTowns: (state, action: PayloadAction<Town[]>) => {
      state.towns = action.payload;
      localStorage.setItem('towns-for-weather-app', JSON.stringify(state.towns));
    },
  },
});

export const { setCurrentTown, addTown, removeTown, setTowns } = townsSlice.actions;

export default townsSlice.reducer;
