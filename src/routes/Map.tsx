import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet';
import { Button } from 'antd';
import { setCurrentTown } from '../features/towns/townsSlice';
import reverseGeoAPI from '../api/reverseGeoAPI';
import { ReverseGeoTown } from '../interfaces/towns';

  const layers = {
    Температура: 'temp_new',
    Облачность: 'clouds',
    'Облачность (классический)': 'clouds_cls',
    Осадки: 'precipitation',
    'Осадки (классический)': 'precipitation_cls',
    Давление: 'pressure_new',
    Ветер: 'wind_new'
  };


function OnClickedPopup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [town, setTown] = useState<ReverseGeoTown | null>(null);
  const map = useMapEvents({
    click(e) {
      reverseGeoAPI.get('', {
        params: { lat: e.latlng.lat, lon: e.latlng.lng}
      })
      .then((response) => {
        setTown(response.data[0]);
        map.flyTo([response.data[0].lat, response.data[0].lon], map.getZoom());
      })
    },
  });

  function closePopup(e: MouseEvent) {
    setTown(null);
    e.stopPropagation();
  }

  function setClickedTown() {
    if (town) {
      const params = {
        name: town.local_names?.ru || town.name,
        latitude: town.lat,
        longitude: town.lon,
        admin1: town?.state
      };
      dispatch(setCurrentTown(params));
      navigate('/');
    }
  }

  return town === null ? null : (
    <Popup position={[town.lat, town.lon]}>
      <p>Показать погоду здесь?</p>
      <p className='flex justify-between'>
        <Button onClick={setClickedTown}>Да</Button>
        <Button onClick={(e) => closePopup(e.nativeEvent)}>Нет</Button>
      </p>
    </Popup>
  );
}


function Map() {
  const currentTown = useAppSelector((state) => state.towns.currentTown);

  return (
    <>
      {currentTown ?
        <MapContainer className='h-full' center={[currentTown.latitude, currentTown.longitude]} zoom={9}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[currentTown.latitude, currentTown.longitude]} />
          <OnClickedPopup />
          <LayersControl>
            {Object.entries(layers).map((entry) => {
              return (
                <LayersControl.Overlay
                  key={entry[0]}
                  name={entry[0]}
                  checked={entry[0] === 'Осадки'}
                >
                  <TileLayer
                    attribution='<a href="https://openweathermap.org/">OpenWeatherMap</a>'
                    url={`https://tile.openweathermap.org/map/${entry[1]}/{z}/{x}/{y}.png?appid=230e569937af52cbff50af356d2501bb`}
                  />
                </LayersControl.Overlay>
              );
            })}
          </LayersControl>
          <ScaleControl imperial={false} />
        </MapContainer>
      :
        <p className='absolute inset-0 my-auto mx-auto w-1/2 h-max text-center text-4xl'>Не выбран город</p>
      }
    </>
  );
}

export default Map;
