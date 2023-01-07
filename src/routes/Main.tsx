import React, { /*useState, */useEffect } from 'react';
//import currentAPI from './api/currentAPI';
import { useAppSelector } from '../app/hooks';
import MainWeatherComponent from '../components/MainWeatherComponent';
import HourlyForecastComponent from '../components/HourlyForecastComponent';

function Main() {
  const forecast = useAppSelector((state) => state.forecast.forecast);

  return (
    <div className="Main">
      <MainWeatherComponent />
      <HourlyForecastComponent list={forecast?.list.slice(0, 8)} />
    </div>
  );
}

export default Main;
