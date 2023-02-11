import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import { useAppSelector } from '../app/hooks';

const routes = {
  '/': 'Сейчас',
  forecast: '5 суток',
  map: 'Карта',
  towns: 'Города'
};


export default function Layout() {

  const isDark = useAppSelector((state) => state.current.isDark);

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
