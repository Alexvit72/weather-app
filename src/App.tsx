import React, { /*useState,*/ useEffect } from 'react';
//import currentAPI from './api/currentAPI';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchCurrentWeather } from './features/current/currentSlice';
import { fetchForecast } from './features/forecast/forecastSlice';
import MainWeatherComponent from './components/MainWeatherComponent';

function App() {
  const forecast = useAppSelector((state) => state.forecast.forecast);
  const dispatch = useAppDispatch();
  let result = {};
  if (forecast?.list) {
    for (let item of forecast.list) {
      const dateStr = item.dt_txt.slice(0, 10);
      if (!Object.keys(result).includes(dateStr)) {
        result[dateStr] = [];
      }
      if (!result[dateStr].includes(item)) {
        result[dateStr].push(item);
      }
    }
  }
  console.log('result', result);

  //const [temp, setTemp] = useState(0);
  //const [name, setName] = useState('');
  useEffect(() => {
    console.log('useEffect');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        dispatch(fetchCurrentWeather(pos));
        dispatch(fetchForecast(pos));
      });
    } else {

    }
  }, []);

  return (
    <div className="App">
      <MainWeatherComponent />
    </div>
  );
}

export default App;
