import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import geoAPI from '../api/geoAPI';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { removeTown } from '../features/towns/townsSlice';
import { setPosition } from '../features/position/positionSlice';
import { SearchTown } from '../interfaces/towns';
import { Position } from '../interfaces/position';
import { AutoComplete } from 'antd';


export default function Towns() {

  const towns = useAppSelector((state) => state.towns.towns);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [options, setOptions] = useState<SearchTown[]>([]);

  function onSelect(index: string) {
    selectTown({ lat: options[+index].lat, lon: options[+index].lon });
  }

  function selectTown(coord: Position) {
    dispatch(setPosition(coord));
    navigate('/');
  }

  function onSearch(str: string) {
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
    <div className="Towns">
      <AutoComplete
        autoFocus
        options={options.map((item: SearchTown, index: number) => {
          return {
            label: `${item.local_names?.ru || item.name}, ш: ${item.lat.toFixed(2)}, д: ${item.lon.toFixed(2)}${item.country ? ', ' + item.country : ''}`,
            value: index.toString()
          };
        })}
        style={{ width: '100%' }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Введите название населённого пункта"
      />
      <div className=''>
        { towns.map((town) => {
          return (
            <p key={town.id}>
              <span onClick={() => selectTown(town.coord)}>
                { town.name }
              </span>
              <span onClick={() => dispatch(removeTown(town))}>
                &times;
              </span>
            </p>
          );
        }) }
      </div>
    </div>
  );

}
