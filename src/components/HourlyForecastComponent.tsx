import React from 'react';
import { ForecastItem } from '../interfaces/forecast';
import WeatherIcon from './WeatherIcon';
import { IconContext } from "react-icons";

type Props = {
  item: ForecastItem
}

export default function HourlyForecast({ item }: Props) {
  return (
    <div className='Hourly-item mx-4'>
      <p>
        { item?.dt_txt.slice(-8, -3) }
      </p>
      <div>
        <IconContext.Provider value={{ size: '3rem' }}>
          { item?.weather[0].icon ?
            <WeatherIcon type={item.weather[0].icon} />
          : '' }
        </IconContext.Provider>
      </div>
      <p>
        { item?.main?.temp?.toFixed() } &deg;C
      </p>
    </div>
  );
}
