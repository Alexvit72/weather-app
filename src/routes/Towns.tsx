import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import geoAPI from '../api/geoAPI';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setCurrentTown, addTown, removeTown } from '../features/towns/townsSlice';
import { Town } from '../interfaces/towns';
import { AutoComplete } from 'antd';

function Towns() {
  const towns = useAppSelector((state) => state.towns.towns);
  console.log('towns', towns);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [options, setOptions] = useState<Town[]>([]);

  function onSelect(id: string) {
    const town = options.filter((item) => item.id === +id)[0];
      dispatch(setCurrentTown(town));
      dispatch(addTown(town));
      navigate('/');
  }

  function onSearch(str: string) {
    geoAPI.get('search', { params: { name: str } })
    .then((response) => {
      setOptions(response.data.results || []);
    })
  }

  function selectTown(town: Town) {
      dispatch(setCurrentTown(town));
      navigate('/');
  }

  function getLabel(town: Town) {
    let result = town.name;
    const admins = [town.admin4, town.admin3, town.admin2, town.admin1];
    for (const admin of admins) {
      if (admin && admin !== town.name) result += (', ' + admin);
    }
    if (town.country) result += (', ' + town.country);
    return result;
  }

  return (
    <div className="Towns">
      <AutoComplete
        autoFocus
        options={options.map((item: Town) => {
          const label = getLabel(item);
          return {
            label: label,
            value: item.id.toString()
          };
        })}
        style={{ width: '100%' }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Начните вводить название населённого пункта"
      />
      <div className=''>
        {towns.map((town) => {
          const label = getLabel(town);
          return (
            <p key={town.id}>
              <span onClick={() => selectTown(town)}>
                { label }
              </span>
              <span onClick={() => dispatch(removeTown(town))}>
                &times;
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Towns;
