import React, { useEffect } from 'react';
import { useRouteLoaderData  } from "react-router-dom";
import MainWeatherComponent from '../components/MainWeatherComponent';
import { LayoutData } from '../interfaces/loaders';
import { Town } from '../interfaces/towns';


export default function Current() {

  const { current } = useRouteLoaderData('layout') as LayoutData;

  useEffect(() => {
    if(current) {
      const town = {
        id: current.id,
        name: current.name,
        coord: current.coord,
        country: current.sys?.country
      };
      addTown(town);
    }
  }, [current]);

  function addTown(town: Town) {
    const storedTowns = localStorage.getItem('towns-for-weather-app');
    const towns = storedTowns ? JSON.parse(storedTowns) : [];
    if (!towns.find((item: Town) => item.id == town.id)) {
      towns.push(town);
      localStorage.setItem('towns-for-weather-app', JSON.stringify(towns));
    }
  }

  return (
    <div className='Current h-full pt-6 pb-8 sm:py-16 flex flex-col justify-between'>
      <h2 className='text-center text-4xl sm:text-5xl'>{ current?.name }</h2>
      <MainWeatherComponent current={current} />
    </div>
  );

}
