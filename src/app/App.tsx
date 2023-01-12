import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import { useAppSelector, useAppDispatch } from './hooks';
import { fetchCurrent } from '../features/current/currentSlice';
import { fetchForecast } from '../features/forecast/forecastSlice';
import { setTowns } from '../features/towns/townsSlice';
import { setPosition } from '../features/position/positionSlice';
import Layout from '../routes/Layout';
import Main from '../routes/Main';
import Forecast from '../routes/Forecast';
import Towns from '../routes/Towns';
import Map from '../routes/Map';
import NoMatch from '../routes/NoMatch';
import { Position } from '../interfaces/position';

export default function App() {
  const position = useAppSelector((state) => state.position.position);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTowns = localStorage.getItem('towns-for-weather-app');
    if (storedTowns) {
      dispatch(setTowns(JSON.parse(storedTowns)));
    }
  }, []);

  useEffect(() => {
    if (position) {
      fetchWeather(position);
    } else {
      getPosition();
    }
  }, [position]);

  function fetchWeather(params: Position) {
    dispatch(fetchCurrent(params));
    dispatch(fetchForecast(params));
  }

  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        dispatch(setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude }));
      });
    } else {
      navigate('towns');
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='towns' element={<Towns />} />
        <Route path='forecast' element={<Forecast />} />
        <Route path='map' element={<Map />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
