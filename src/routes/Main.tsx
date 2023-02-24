import React, { useEffect } from 'react';
import { useLoaderData, useRouteLoaderData  } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import MainWeatherComponent from '../components/MainWeatherComponent';
import HourlyForecastComponent from '../components/HourlyForecastComponent';
import { addTown } from '../features/towns/townsSlice';
import { Position } from '../interfaces/position';
import { LayoutData } from '../interfaces/layout';
import { Forecast } from '../interfaces/forecast';
import weatherAPI from '../api/weatherAPI';
import { AxiosResponse } from 'axios';

/*async function getPosition() {
  return new Promise((resolve: (value: GeolocationPosition) => void) => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => resolve(pos));
  })
  .then((result): Position => {
    return { lat: result.coords.latitude, lon: result.coords.longitude };
  })
}

export async function loader() {
  const position = await getPosition();
  const currentResponse = await weatherAPI.get('weather', { params: position });
  const forecastResponse = await weatherAPI.get('forecast', { params: position });

  return {
    position,
    current: {
      data: currentResponse.data,
      isDark: !(currentResponse.data.dt >= currentResponse.data.sys.sunrise && currentResponse.data.dt <= currentResponse.data.sys.sunset)
    },
    forecast: forecastResponse.data
  };
}*/


export default function Main() {

  const { current } = useRouteLoaderData('layout') as LayoutData;
  console.log('current', current);


  //const current = useAppSelector((state) => state.current.current);
  //const forecast = useAppSelector((state) => state.forecast.forecast);
  /*const dispatch = useAppDispatch();

  useEffect(() => {
    if(current) {
      const town = {
        id: current.data.id,
        name: current.data.name,
        coord: current.data.coord,
        country: current.data.sys?.country
      };
      dispatch(addTown(town));
    }
  }, [current]);*/

  return (
    <div className='Main h-full pt-6 pb-8 sm:py-16 flex flex-col justify-between'>
      <h2 className='text-center text-4xl sm:text-5xl'>{ current?.name }</h2>
      <MainWeatherComponent current={current} />
      {/*<div className='flex w-full overflow-x-auto sm:justify-evenly'>
        { forecast?.list?.length && forecast?.list.slice(0, 8).map((item) => {
          return <HourlyForecastComponent key={item.dt} item={item} />;
        }) }
      </div>*/}
    </div>
  );

}
