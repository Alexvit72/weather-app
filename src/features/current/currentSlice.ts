import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CurrentWeather } from '../../interfaces/current';
import { Position } from '../../interfaces/position';
import weatherAPI from '../../api/weatherAPI';

// Define a type for the slice state
interface CurrentState {
  current: CurrentWeather | null,
  isDark: boolean,
  loading: string
}

// Define the initial state using that type
const initialState: CurrentState = {
  current: null,
  isDark: false,
  loading: 'idle'
};

export const fetchCurrent = createAsyncThunk(
  'current/fetchCurrent',
  async (params: Position) => {
    const response = await weatherAPI.get('weather', { params: { ...params } });
    return response.data;
  }
);

export const currentSlice = createSlice({
  name: 'current',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCurrent.fulfilled, (state, action) => {
      state.current = action.payload;
      state.isDark = !(action.payload.dt >= action.payload.sys.sunrise && action.payload.dt <= action.payload.sys.sunset);
    });
  },
});

export default currentSlice.reducer;
