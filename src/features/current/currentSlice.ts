import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store';
import { CurrentWeather } from '../../interfaces/current';
import weatherAPI from '../../api/weatherAPI';

// Define a type for the slice state
interface CurrentState {
  current: CurrentWeather | null,
  loading: string
}

// Define the initial state using that type
const initialState: CurrentState = {
  current: null,
  loading: 'idle'
};

export const fetchCurrent = createAsyncThunk(
  'current/fetchCurrent',
  async (params: { latitude: number, longitude: number }) => {
    const response = await weatherAPI.get('weather', {
      params: {
        lat: params.latitude,
        lon: params.longitude
      }
    });
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
    });
  },
});

export default currentSlice.reducer;
