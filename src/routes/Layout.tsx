import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

function Layout() {

  return (
    <div className="Layout">
      <header>
        <nav>
          <NavLink to='towns'>Города</NavLink>
          <NavLink to='forecast'>5 дней</NavLink>
          <NavLink to='map'>Карта</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
