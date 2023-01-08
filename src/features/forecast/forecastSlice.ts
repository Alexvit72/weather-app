import { createSlice, createAsyncThunk/*, PayloadAction*/ } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store';
import { Forecast } from '../../interfaces/forecast';
import currentAPI from '../../api/currentAPI';

// Define a type for the slice state
interface CurrentState {
  forecast: Forecast | null,
  loading: string
}

interface DailyForecast {
  [key: string]: Array<{}>
}

// Define the initial state using that type
const initialState: CurrentState = {
  forecast: null,
  loading: 'idle'
};

export const fetchForecast = createAsyncThunk(
  'current/fetchForecast',
  async (params: { latitude: number, longitude: number }) => {
    const response = await currentAPI.get('forecast', {
      params: {
        lat: params.latitude,
        lon: params.longitude
      }
    });
    return response.data;
  }
);

export const forecastSlice = createSlice({
  name: 'forecast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /*increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },*/
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      // Add user to the state array
      //console.log('forecast', action.payload);
      state.forecast = action.payload;
    });
  },
});

//export const { increment, decrement, incrementByAmount } = currentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const current = (state: RootState) => state.current;

export default forecastSlice.reducer;
