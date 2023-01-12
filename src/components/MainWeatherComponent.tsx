import React from 'react';
import { useAppSelector } from '../app/hooks';
import WeatherIcon from './WeatherIcon';
import { IconContext } from "react-icons";
import { Divider, Space } from 'antd';


export default function MainWeatherComponent() {
  const current = useAppSelector((state) => state.current.current);

  return (
    <div className='text-center'>
      <p>
        { `${current?.dt ? new Date(current?.dt * 1000).toLocaleString('ru-RU') : ''}` }
      </p>
      <Space>
        <div className='flex flex-col items-center my-4'>
          <IconContext.Provider value={{ size: '10rem' }}>
            {current?.weather[0].icon ?
              <WeatherIcon type={current.weather[0].icon} />
            : ''}
            <span>{ current?.weather.map(item => item.description).join(', ') }</span>
          </IconContext.Provider>
        </div>
        <div>
          <p className='text-5xl'>
            <span className='font-semibold'>{ current?.main?.temp?.toFixed() }</span> &deg;C
          </p>
          <p>
            Ощущается как <span className='text-xl font-bold'>{ current?.main?.feels_like?.toFixed() }</span> &deg;C
          </p>
        </div>
      </Space>
      <Space className='mt-4' split={<Divider type='vertical' style={{ borderColor: 'white' }} />}>
        <p>
          <IconContext.Provider value={{ size: '1.5rem', className: 'from-180-deg inline' }}>
            <p>Ветер</p> <WeatherIcon type='wind' /> { `${current?.wind?.speed?.toFixed()} ${current?.wind?.gust ? '- ' +  current.wind.gust.toFixed() : ''}` } м/с
          </IconContext.Provider>
        </p>
        <p>
          <p>Влажность</p> { current?.main?.humidity } %
        </p>
        <p>
          <p>Давление</p> { current?.main?.pressure } гПа
        </p>
      </Space>
    </div>
  );
}
