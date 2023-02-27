import React, { useState, useEffect } from 'react';
import { useRouteLoaderData  } from "react-router-dom";
import { Forecast, ForecastItem } from '../interfaces/forecast';
import HourlyForecastComponent from '../components/HourlyForecastComponent';
import NoDataComponent from '../components/NoDataComponent';
import { LayoutData } from '../interfaces/loaders';


export default function Forecasts() {

  const { forecast } = useRouteLoaderData('layout') as LayoutData;
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
        <div className='h-full overflow-y-auto py-4'>
          <h2 className='mb-10 text-center text-4xl sm:text-5xl'>
            { forecast?.city?.name }
          </h2>
          { Object.entries(dailyForecast).map(([ key, value ]) => {
            return (
              <div className='my-8' key={key}>
                <h3 className='mb-2 text-center text-2xl'>{ key }</h3>
                <div className='flex sm:justify-center w-full'>
                  <div className='flex overflow-x-auto'>
                    { value.map((elem) => {
                      return (
                        <HourlyForecastComponent key={elem.dt} item={elem} />
                      );
                    }) }
                  </div>
                </div>
              </div>
            );
          }) }
        </div>
      :
        <NoDataComponent text='Не выбран город' />
      }
    </>
  );
}
