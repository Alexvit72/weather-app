import React, { useState, useEffect } from 'react';
import { Forecast, ForecastItem } from '../interfaces/forecast';
import { useAppSelector } from '../app/hooks';
import DailyForecastComponent from '../components/DailyForecastComponent';
import NoDataComponent from '../components/NoDataComponent';


export default function Forecasts() {

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
    return result;
  }

  return (
    <>
      { forecast ?
        <div className='Forecast h-full overflow-y-auto py-4'>
          <h2 className='text-center'>{ forecast?.city?.name }</h2>
          { Object.entries(dailyForecast).map(([ key, value ]) => {
            return (
              <DailyForecastComponent key={key} day={key} item={value} />
            );
          }) }
        </div>
      :
        <NoDataComponent text='Не выбран город' />
      }
    </>
  );
}
