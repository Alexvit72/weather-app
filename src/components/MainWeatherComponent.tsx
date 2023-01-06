import React from 'react';
//import { CurrentWeather } from '../interfaces/current';
import { useAppSelector } from '../app/hooks';

/*export interface Props {
  current: CurrentWeather | null
}*/

function MainWeatherComponent() {
  const current = useAppSelector((state) => state.current.current);
  return (
    <div className="Main">
      <p>
        { `${current?.dt ? new Date(current?.dt * 1000).toLocaleString() : ''}` }
      </p>
      <div>
        {current?.weather[0].icon ?
          <img
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
