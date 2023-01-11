import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '../../interfaces/position';

// Define a type for the slice state
interface positionState {
  position: Position | null
}

// Define the initial state using that type
const initialState: positionState = {
  position: null
};

export const positionSlice = createSlice({
  name: 'position',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPosition: (state, action: PayloadAction<Position>) => {
      state.position = action.payload;
    },
  },
});

export const { setPosition } = positionSlice.actions;

export default positionSlice.reducer;
