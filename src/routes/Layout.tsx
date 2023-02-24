import React from 'react';
import { Outlet, NavLink, useLoaderData } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { Position } from '../interfaces/position';
import { CurrentWeather } from '../interfaces/current';
import { LayoutData } from '../interfaces/layout';
import { AxiosResponse } from 'axios';
import weatherAPI from '../api/weatherAPI';

const routes = {
  '/': 'Сейчас',
  forecast: '5 суток',
  map: 'Карта',
  towns: 'Города'
};

async function getPosition() {
  return new Promise((resolve: (value: GeolocationPosition) => void) => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => resolve(pos));
  })
  .then((result): Position => {
    return { lat: result.coords.latitude, lon: result.coords.longitude };
  })
}

export async function loader() {
  const position = await getPosition();
  const current = await weatherAPI.get('weather', { params: position });
  const forecast = await weatherAPI.get('forecast', { params: position });
  return { position, current: current.data, forecast: forecast.data };
}


export default function Layout() {

  const { current } = useLoaderData() as LayoutData;
  console.log('current', current);
  //const isDark = useAppSelector((state) => state.current.isDark);
  const isDark = !(current.dt >= current.sys.sunrise && current.dt <= current.sys.sunset);

  return (
    <div className={isDark ? 'dark' : undefined}>
      <div className='Layout h-screen flex flex-col bg-blue-300 dark:bg-slate-800 text-white'>
        <header>
          <nav className='flex border-b border-white'>
            { Object.entries(routes).map(([ key, value ]) => {
              return (
                <NavLink
                  key={key}
                  to={key}
                  className={({ isActive }) => `flex-grow p-2 sm:w-1/6 text-center ${isActive ? 'bg-slate-800 dark:bg-blue-300 font-bold' : 'bg-transparent'}`}
                >
                  { value }
                </NavLink>
              );
            }) }
          </nav>
        </header>
        <Outlet />
      </div>
    </div>
  );

}
