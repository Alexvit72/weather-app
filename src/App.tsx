import React, { /*useState,*/ useEffect } from 'react';
//import currentAPI from './api/currentAPI';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchCurrentWeather } from './features/current/currentSlice';
import MainWeatherComponent from './components/MainWeatherComponent';

function App() {
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

  return (
    <div className="App">
      <MainWeatherComponent
        current={current}
      />
    </div>
  );
}

export default App;
