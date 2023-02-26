import React, { useEffect } from 'react';
import {
  Outlet,
  NavLink,
  useLoaderData,
  useNavigate,
  useParams,
  LoaderFunctionArgs
} from "react-router-dom";
import { LayoutData } from '../interfaces/loaders';
import weatherAPI from '../api/weatherAPI';

const navLinks = {
  current: 'Сейчас',
  forecast: '5 суток',
  map: 'Карта',
  towns: 'Города'
};

export async function loader({ params }: LoaderFunctionArgs) {
  const currentResponse = await weatherAPI.get('weather', { params: { ...params } });
  const forecastResponse = await weatherAPI.get('forecast', { params: { ...params } });
  return { current: currentResponse.data, forecast: forecastResponse.data };
}


export default function Layout() {

  const navigate = useNavigate();
  let { lat, lon } = useParams();
  const { current } = useLoaderData() as LayoutData;
  const isDark = !(current.dt >= current.sys.sunrise && current.dt <= current.sys.sunset);

  useEffect(() => {
    if (current) {
      navigate('current', { replace: true });
    }
  }, [lat, lon]);

  return (
    <div className={isDark ? 'dark' : undefined}>
      <div className='Layout h-screen flex flex-col bg-blue-300 dark:bg-slate-800 text-white'>
        <header>
          <nav className='flex border-b border-white'>
            { Object.entries(navLinks).map(([ key, value ]) => {
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
