import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

const routes = {
  '/': 'Сейчас',
  forecast: '5 суток',
  map: 'Карта',
  towns: 'Города'
};


function Layout() {
  return (
    <div className='Layout h-screen flex flex-col bg-sky-300 dark:bg-sky-900 text-white'>
      <header>
        <nav className='flex justify-evenly p-4 text-white border-b-2 border-white'>
        {Object.entries(routes).map((entry) => {
          return (
            <NavLink
              to={entry[0]}
              className={({ isActive }) => `p-2 w-1/5 sm:w-1/12 text-center border-2 rounded-3xl ${isActive ? 'border-slate-50' : 'border-transparent'}`}
            >
              { entry[1] }
            </NavLink>
          );
        })}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
