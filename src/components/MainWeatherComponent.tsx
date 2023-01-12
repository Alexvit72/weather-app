import React from 'react';
import { useAppSelector } from '../app/hooks';
import WeatherIcon from './WeatherIcon';
import { IconContext } from "react-icons";


export default function MainWeatherComponent() {
  const current = useAppSelector((state) => state.current.current);

  return (
    <div className='text-center'>
      <p>
        { `${current?.dt ? new Date(current?.dt * 1000).toLocaleString() : ''}` }
      </p>
      <div className='flex flex-col items-center'>
        <IconContext.Provider value={{ size: '10rem' }}>
          {current?.weather[0].icon ?
            <WeatherIcon type={current.weather[0].icon} />
          : ''}
          <span>{ current?.weather.map(item => item.description).join(', ') }</span>
        </IconContext.Provider>
      </div>
      <p>
        { current?.main?.temp?.toFixed() } &deg;C
      </p>
      <p>
        Ощущается как { current?.main?.feels_like?.toFixed() } &deg;C
      </p>
      <p>
        Ветер { `${current?.wind?.speed?.toFixed()} ${current?.wind?.gust ? '- ' +  current.wind.gust.toFixed() : ''}` } м/с
      </p>
      <p>
        Влажность { current?.main?.humidity } %
      </p>
      <p>
        Давление { current?.main?.pressure } гПа
      </p>
    </div>
  );
}
