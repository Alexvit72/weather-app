import React, { useState, useEffect } from 'react';
import { Forecast, ForecastItem } from '../interfaces/forecast';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import DailyForecastComponent from '../components/DailyForecastComponent';

function Forecasts() {
  const currentTown = useAppSelector((state) => state.towns.currentTown);
  const forecast = useAppSelector((state) => state.forecast.forecast);

  const [dailyForecast, setDailyForecast] = useState<{ [key: string]: ForecastItem[] }>({});

  useEffect(() => {
    const daily = getDailyForecast(forecast);
    setDailyForecast(daily);
  }, [forecast]);

  function getDailyForecast(forecast: Forecast | null) {
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
    return result;
  }

  return (
    <>
      {currentTown ?
        <div className="Forecast">
          <h2 className='text-center'>{ currentTown?.name }</h2>
          {Object.entries(dailyForecast).map((item) => {
            return (
              <DailyForecastComponent key={item[0]} day={item[0]} item={item[1]} />
            );
          })}
        </div>
      :
        <p className='absolute inset-0 my-auto mx-auto w-1/2 h-max text-center text-4xl'>Не выбран город</p>
      }
    </>
  );
}

export default Forecasts;
