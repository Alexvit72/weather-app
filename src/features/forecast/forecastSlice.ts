import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Forecast } from '../../interfaces/forecast';
import { Position } from '../../interfaces/position';
import weatherAPI from '../../api/weatherAPI';

// Define a type for the slice state
interface CurrentState {
  forecast: Forecast | null,
  loading: string
}

// Define the initial state using that type
const initialState: CurrentState = {
  forecast: null,
  loading: 'idle'
};

export const fetchForecast = createAsyncThunk(
  'current/fetchForecast',
  async (params: Position) => {
    const response = await weatherAPI.get('forecast', { params: { ...params } });
    return response.data;
  }
);

export const forecastSlice = createSlice({
  name: 'forecast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.forecast = action.payload;
    });
  },
});

export default forecastSlice.reducer;
