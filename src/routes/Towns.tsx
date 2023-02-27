import React, { useState } from 'react';
import {
  Link,
  useNavigate,
  useSubmit,
  useLoaderData,
  useRouteLoaderData,
  ActionFunctionArgs
} from "react-router-dom";
import geoAPI from '../api/geoAPI';
import { SearchTown, Town } from '../interfaces/towns';
import { Position } from '../interfaces/position';
import { MainData, TownsData } from '../interfaces/loaders';
import { AutoComplete } from 'antd';

export function loader() {
  const storedTowns = localStorage.getItem('towns-for-weather-app');
  const towns = storedTowns ? JSON.parse(storedTowns) : [];
  return { towns };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const townData = formData.get('town') as string;
  const town = JSON.parse(townData);
  const storedTowns = localStorage.getItem('towns-for-weather-app');
  const towns = storedTowns ? JSON.parse(storedTowns) : [];
  const newTowns = towns.filter((item: Town) => item.id !== town.id);
  localStorage.setItem('towns-for-weather-app', JSON.stringify(newTowns));
  return null;
}


export default function Towns() {

  const { towns } = useLoaderData() as TownsData;
  const { geoPosition } = useRouteLoaderData('main') as MainData;
  const navigate = useNavigate();
  const submit = useSubmit();
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<SearchTown[]>([]);

  function getTownLabel(town: SearchTown) {
    return `${town.local_names?.ru || town.name}, ш: ${town.lat.toFixed(2)}, д: ${town.lon.toFixed(2)}${town.country ? ', ' + town.country : ''}`
  }

  function onSelect(index: string) {
    setValue(getTownLabel(options[+index]));
    selectTown({ lat: options[+index].lat, lon: options[+index].lon });
  }

  function selectTown(coord: Position) {
    navigate(`/${coord.lat}/${coord.lon}`);
  }

  function removeTown(town: Town) {
    const formData = new FormData();
    formData.append('town', JSON.stringify(town));
    submit(formData, { method: 'post' });
  }

  function onSearch(str: string) {
    setValue(str);
    if (str) {
      geoAPI.get('direct', { params: { q: str, limit: 5 } })
      .then((response) => {
        setOptions(response.data);
      })
    } else {
      setOptions([]);
    }
  }

  return (
    <div className='flex flex-col sm:items-center py-8 sm:py-16 px-4'>
      <AutoComplete
        className='w-full sm:w-1/3'
        autoFocus
        value={value}
        options={options.map((item: SearchTown, index: number) => {
          return {
            label: getTownLabel(item),
            value: index.toString()
          };
        })}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder='Введите название населённого пункта'
      />
      <div className='text-xl truncate px-4 my-8 sm:w-1/5'>
        <Link to={`/${geoPosition.lat}/${geoPosition.lon}/current`}>
          Моё местоположение
        </Link>
      </div>
      <div className='px-4 sm:w-1/5'>
        { towns.map((town: Town) => {
          return (
            <p className='flex justify-between w-full my-4' key={town.id}>
              <span
                className='cursor-pointer'
                onClick={() => selectTown(town.coord)}
              >
                { town.name }
              </span>
              <span
                className='cursor-pointer ml-8'
                onClick={() => removeTown(town)}
              >
                &times;
              </span>
            </p>
          );
        }) }
      </div>
    </div>
  );

}
