import React from 'react';
import { ForecastItem } from '../interfaces/forecast';

export interface Props {
  item: ForecastItem
}


function HourlyForecast({ item }: Props) {
  return (
    <div className='Hourly-item mx-8'>
      <p>
        { item?.dt_txt.slice(-8, -3) }
      </p>
      <div>
        {item?.weather[0].icon ?
          <img
            src={`http://openweathermap.org/img/wn/${item?.weather[0].icon}.png`}
            alt=''
          />
        : ''}
      </div>
      <p>
        { item?.main?.temp?.toFixed() } &deg;C
      </p>
    </div>
  );
}


export default HourlyForecast;
