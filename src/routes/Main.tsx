import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchCurrentWeather } from '../features/current/currentSlice';
import { fetchForecast } from '../features/forecast/forecastSlice';
import { setCurrentTown, addTown } from '../features/towns/townsSlice';
import MainWeatherComponent from '../components/MainWeatherComponent';
import HourlyForecastComponent from '../components/HourlyForecastComponent';
import { Town } from '../interfaces/towns';

function Main() {
  const currentTown = useAppSelector((state) => state.towns.currentTown);
  const forecast = useAppSelector((state) => state.forecast.forecast);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentTown) {
      getTownData(currentTown);
    } else {
      getPositionData();
    }
  }, []);

  function getTownData(town: Town) {
    const params = { latitude: town.latitude, longitude: town.longitude };
    dispatch(fetchCurrentWeather(params));
    dispatch(fetchForecast(params));
  }

  function getPositionData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        const params = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        dispatch(fetchCurrentWeather(params))
        .then((response) => {
          const town = {
            id: response.payload.id,
            name: response.payload.name,
            latitude: response.payload.coord.lat,
            longitude: response.payload.coord.lon
          };
          dispatch(setCurrentTown(town));
          dispatch(addTown(town));
        });
        dispatch(fetchForecast(params));
      });
    } else {
      navigate('towns');
    }
  }

  return (
    <div className="Main">
      <h2>{ currentTown?.name }</h2>
      <MainWeatherComponent />
      <HourlyForecastComponent list={forecast?.list.slice(0, 8)} />
    </div>
  );
}

export default Main;
