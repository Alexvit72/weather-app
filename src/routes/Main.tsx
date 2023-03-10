import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import MainWeatherComponent from '../components/MainWeatherComponent';
import HourlyForecastComponent from '../components/HourlyForecastComponent';
import { addTown } from '../features/towns/townsSlice';


export default function Main() {

  const current = useAppSelector((state) => state.current.current);
  const forecast = useAppSelector((state) => state.forecast.forecast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(current) {
      const town = {
        id: current.id,
        name: current.name,
        coord: current.coord,
        country: current.sys?.country
      };
      dispatch(addTown(town));
    }
  }, [current]);

  return (
    <div className='Main h-full pt-6 pb-8 sm:py-16 flex flex-col justify-between'>
      <h2 className='text-center text-4xl sm:text-5xl'>{ current?.name }</h2>
      <MainWeatherComponent />
      <div className='flex w-full overflow-x-auto sm:justify-evenly'>
        { forecast?.list?.length && forecast?.list.slice(0, 8).map((item) => {
          return <HourlyForecastComponent key={item.dt} item={item} />;
        }) }
      </div>
    </div>
  );
  
}
