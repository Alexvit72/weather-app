import React from 'react';
import { ForecastItem } from '../interfaces/forecast';
import { useAppSelector, useAppDispatch } from '../app/hooks';

function Forecast() {
  const forecast = useAppSelector((state) => state.forecast.forecast);
  let result: { [key: string]: ForecastItem[] } = {};
  if (forecast?.list) {
    for (let item of forecast.list) {
      const dateStr = item.dt_txt.slice(0, 10);
      if (!Object.keys(result).includes(dateStr)) {
        result[dateStr] = [];
      }
      if (!result[dateStr].includes(item)) {
        result[dateStr].push(item);
      }
    }
  }
  console.log('result', result);

  return (
    <div className="Forecast">
      Foreast
    </div>
  );
}

export default Forecast;
