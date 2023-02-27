import React, { useEffect, useState } from 'react';
import { useRouteLoaderData  } from "react-router-dom";
import { LayoutData } from '../interfaces/loaders';
import { Town } from '../interfaces/towns';
import WeatherIcon from '../components/WeatherIcon';
import { IconContext } from "react-icons";
import { Divider, Space, Button } from 'antd';


export default function Current() {

  const { current } = useRouteLoaderData('layout') as LayoutData;
  const [extended, setExtended] = useState<boolean>(false);

  useEffect(() => {
    if(current) {
      const town = {
        id: current.id,
        name: current.name,
        coord: current.coord,
        country: current.sys?.country
      };
      addTown(town);
    }
  }, [current]);

  function addTown(town: Town) {
    const storedTowns = localStorage.getItem('towns-for-weather-app');
    const towns = storedTowns ? JSON.parse(storedTowns) : [];
    if (!towns.find((item: Town) => item.id == town.id)) {
      towns.push(town);
      localStorage.setItem('towns-for-weather-app', JSON.stringify(towns));
    }
  }

  return (
    <div className='h-full pt-6 pb-8 sm:py-16'>
      <h2 className='mb-10 sm:mb-20 text-center text-4xl sm:text-5xl'>{ current?.name }</h2>
      <div className='text-center'>
        <p>
          { `${current?.dt ? new Date(current?.dt * 1000).toLocaleString('ru-RU') : ''}` }
        </p>
        <div className='flex flex-col items-center my-4'>
          <IconContext.Provider value={{ size: '10rem' }}>
            { current?.weather[0].icon ?
              <WeatherIcon type={current.weather[0].icon} />
            : '' }
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
        { extended ?
          <div className=''>
            <Space
              className='mt-4'
              split={<Divider type='vertical' style={{ borderColor: 'white' }} />}
            >
              <div>
                <IconContext.Provider value={{ size: '1.5rem', className: `from-90-deg inline` }}>
                  <p>Ветер</p>
                  <WeatherIcon type='wind' /> { `${current?.wind?.speed?.toFixed()} ${current?.wind?.gust ? '- ' +  current.wind.gust.toFixed() : ''}` } м/с
                </IconContext.Provider>
              </div>
              <div>
                <p>Влажность</p> { current?.main?.humidity } %
              </div>
              <div>
                <p>Давление</p> { current?.main?.pressure } гПа
              </div>
            </Space>
          </div>
        : null }
        <Button type="text" onClick={() => setExtended(!extended)}>
          <span className='text-white'>{ extended ? 'Свернуть' : 'Подробно' }</span>
          <IconContext.Provider value={{ size: '1.5rem', className: 'inline text-white' }}>
            <WeatherIcon type={extended ? 'up' : 'down'} />
          </IconContext.Provider>
        </Button>
      </div>
    </div>
  );

}
