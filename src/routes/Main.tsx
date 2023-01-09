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
        console.log('pos', pos);
        const params = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        dispatch(fetchCurrentWeather(params))
        .then((response) => {
          const town = {
            id: response.payload.id,
            name: response.payload.name,
            latitude: response.payload.coord.lat,
            longitude: response.payload.coord.lon
          };
          console.log('town', town);

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
    <div className='Main h-full py-8 flex flex-col justify-between'>
      <h2 className='text-center'>{ currentTown?.name }</h2>
      <MainWeatherComponent />
      <div className='flex justify-evenly'>
        {forecast?.list?.length && forecast?.list.slice(0, 8).map((item) => {
          return <HourlyForecastComponent key={item.dt} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Main;
