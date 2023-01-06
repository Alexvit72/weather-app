import React from 'react';
import { ForecastItem } from '../interfaces/forecast';

export interface Props {
  list: ForecastItem[] | undefined
}

function HourlyForecast({ list }: Props) {
  return (
    <div className='Hourly'>
      {list?.length && list.map((item) => {
        return (
          <div key={item.dt} className='Hourly-item'>
            <p>
              { item.dt_txt.slice(-8, -3) }
            </p>
            <div>
              {item?.weather[0].icon ?
                <img
                  src={`http://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`}
                  alt=''
                />
              : ''}
            </div>
            <p>
              { item?.main?.temp?.toFixed() } &deg;C
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default HourlyForecast;
