import React from 'react';
import { ForecastItem } from '../interfaces/forecast';
import HourlyForecastComponent from '../components/HourlyForecastComponent';

interface Props {
  day: string,
  item: ForecastItem[]
}


export default function DailyForecast({ day, item }: Props) {
  return (
    <div className='my-4'>
      <h3 className='mb-2 text-center'>{ day }</h3>
      <div className='flex max-w-full overflow-x-auto'>
        {item.map((elem) =>{
          return (
            <HourlyForecastComponent key={elem.dt} item={elem} />
          );
        })}
      </div>
    </div>
  );
}
