import React, { /*useState,*/ useEffect } from 'react';
//import currentAPI from './api/currentAPI';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchCurrentWeather } from './currentSlice';

function Current() {
  const current = useAppSelector((state) => state.current.current);
  const dispatch = useAppDispatch();
  //const [temp, setTemp] = useState(0);
  //const [name, setName] = useState('');
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => dispatch(fetchCurrentWeather(pos)));
    } else {

    }
  }, []);

  /*const fetchWeather = (pos: GeolocationPosition) => {
    dispatch(fetchCurrentWeather(pos));
    currentAPI.get('weather', {
      params: {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      }
    })
    .then((response) => {
      console.log('response', response.data);
      setTemp(response.data.main.temp);
      setName(response.data.name);
    })
  };*/

  return (
    <div className="Current">
      <p>
        { current?.name }
      </p>
      <p>
        { current?.main.temp } &deg;C
      </p>
    </div>
  );
}

export default Current;
