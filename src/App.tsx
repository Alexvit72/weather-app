import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout, { loader as dataLoader } from './routes/Layout';
import Main, { loader as positionLoader } from './routes/Main';
import Current from './routes/Current';
import Forecast from './routes/Forecast';
import Towns, { action as townAction, loader as townsLoader } from './routes/Towns';
import NoDataComponent from './components/NoDataComponent';



const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        id='main'
        element={<Main />}
        loader={positionLoader}
        errorElement={<NoDataComponent text='Ошибка!' />}
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
            path='towns'
            element={<Towns />}
            loader={townsLoader}
            action={townAction}
          />
        </Route>
      </Route>
      <Route path="*" element={<NoDataComponent text='Здесь ничего нет ):' />} />
    </>
  )
);

export default App;
