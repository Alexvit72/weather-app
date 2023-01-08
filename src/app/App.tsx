import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { useAppDispatch } from './hooks';
import { setTowns } from '../features/towns/townsSlice';
import Layout from '../routes/Layout';
import Main from '../routes/Main';
import Forecast from '../routes/Forecast';
import Towns from '../routes/Towns';
import Map from '../routes/Map';
import NoMatch from '../routes/NoMatch';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTowns = localStorage.getItem('towns-for-weather-app');
    console.log('storedTowns', storedTowns);
    if (storedTowns) {
      dispatch(setTowns(JSON.parse(storedTowns)));
    }
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
