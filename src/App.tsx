import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import './App.css';
import Layout, { loader as dataLoader } from './routes/Layout';
import Main, { loader as positionLoader } from './routes/Main';
import Current from './routes/Current';
import Forecast from './routes/Forecast';
import Towns, { action as townAction, loader as townsLoader } from './routes/Towns';
import Map from './routes/Map';
import NoMatch from './routes/NoMatch';



const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        id='main'
        element={<Main />}
        loader={positionLoader}
      >
        <Route
          path=':lat/:lon'
          id='layout'
          element={<Layout />}
          loader={dataLoader}
        >
          <Route
            index
            path='current'
            element={<Current />}
          />
          <Route
            path='forecast'
            element={<Forecast />}
          />
          <Route
            path='map'
            element={<Map />}
          />
          <Route
            path='towns'
            element={<Towns />}
            loader={townsLoader}
            action={townAction}
          />
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>
  )
);

export default App;
