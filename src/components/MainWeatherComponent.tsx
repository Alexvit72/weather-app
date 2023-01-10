import React from 'react';
import { useAppSelector } from '../app/hooks';


function MainWeatherComponent() {
  const current = useAppSelector((state) => state.current.current);
  return (
    <div className='text-center'>
      <p>
        { `${current?.dt ? new Date(current?.dt * 1000).toLocaleString() : ''}` }
      </p>
      <div className='flex flex-col items-center'>
        {current?.weather[0].icon ?
          <img
            className='inline'
            src={`http://openweathermap.org/img/wn/${current?.weather[0].icon}@2x.png`}
            alt=''
          />
        : ''}
        <span>{ current?.weather[0].description }</span>
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

export default MainWeatherComponent;
