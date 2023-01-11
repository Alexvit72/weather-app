import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div className='Layout h-screen flex flex-col'>
      <header>
        <nav className='flex justify-evenly p-4 bg-gray-800 text-white'>
          <NavLink to='towns'>Города</NavLink>
          <NavLink to='forecast'>5 суток</NavLink>
          <NavLink to='map'>Карта</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
