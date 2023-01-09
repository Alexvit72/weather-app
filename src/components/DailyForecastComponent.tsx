import React from 'react';
import { ForecastItem } from '../interfaces/forecast';
import HourlyForecastComponent from '../components/HourlyForecastComponent';

export interface Props {
  day: string,
  item: ForecastItem[]
}

//const times = ['ночь', 'утро', 'день', 'вечер'];

function DailyForecast({ day, item }: Props) {

  return (
    <div className='my-4'>
      <h3 className='mb-2 text-center'>{ day }</h3>
      <div className='flex px-8'>
        {item.map((elem) =>{
          return (
            <HourlyForecastComponent key={elem.dt} item={elem} />
          );
        })}
      </div>
    </div>
  );
}

export default DailyForecast;
