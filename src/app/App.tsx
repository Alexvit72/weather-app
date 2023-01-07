import React, { /*useState, */useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
//import currentAPI from './api/currentAPI';
import './App.css';
import { useAppSelector, useAppDispatch } from './hooks';
import { fetchCurrentWeather } from '../features/current/currentSlice';
import { fetchForecast } from '../features/forecast/forecastSlice';
import Layout from '../routes/Layout';
import Main from '../routes/Main';
import Forecast from '../routes/Forecast';
import Towns from '../routes/Towns';
import Map from '../routes/Map';
import NoMatch from '../routes/NoMatch';
import { ForecastItem } from '../interfaces/forecast';

function App() {
  const forecast = useAppSelector((state) => state.forecast.forecast);
  const dispatch = useAppDispatch();
  let result: { [key: string]: ForecastItem[] } = {};
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
    function getPositionData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
          dispatch(fetchCurrentWeather(pos));
          dispatch(fetchForecast(pos));
        });
      } else {

      }
    }
    getPositionData();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='towns' element={<Towns />} />
        <Route path='forecast' element={<Forecast />} />
        <Route path='map' element={<Map />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
