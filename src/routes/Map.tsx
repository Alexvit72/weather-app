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
import NoDataComponent from '../components/NoDataComponent';
import { Button } from 'antd';
import { setPosition } from '../features/position/positionSlice';
import geoAPI from '../api/geoAPI';
import { SearchTown } from '../interfaces/towns';

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

  const [town, setTown] = useState<SearchTown | null>(null);

  const map = useMapEvents({
    click(e) {
      geoAPI.get('reverse', {
        params: { lat: e.latlng.lat, lon: e.latlng.lng, limit: 1}
      })
      .then((response) => {
        if (response.data.length) {
          setTown(response.data[0]);
          map.flyTo([response.data[0].lat, response.data[0].lon], map.getZoom());
        }
      })
    },
  });

  function closePopup(e: MouseEvent) {
    setTown(null);
    e.stopPropagation();
  }

  function setClickedTown() {
    if (town) {
      dispatch(setPosition({ lat: town.lat, lon: town.lon }));
      navigate('/');
    }
  }

  return town === null ? null : (
    <Popup position={[town.lat, town.lon]}>
      <p>
        Показать погоду здесь?
      </p>
      <p className='flex justify-between'>
        <Button onClick={setClickedTown}>Да</Button>
        <Button onClick={(e) => closePopup(e.nativeEvent)}>Нет</Button>
      </p>
    </Popup>
  );

}


export default function Map() {

  const position = useAppSelector((state) => state.position.position);

  return (
    <>
      { position ?
        <MapContainer className='h-full' center={[position.lat, position.lon]} zoom={9}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[position.lat, position.lon]} />
          <OnClickedPopup />
          <LayersControl>
            { Object.entries(layers).map(([ key, value ]) => {
              return (
                <LayersControl.Overlay
                  key={key}
                  name={key}
                  checked={key === 'Осадки'}
                >
                  <TileLayer
                    attribution='<a href="https://openweathermap.org/">OpenWeatherMap</a>'
                    url={`https://tile.openweathermap.org/map/${value}/{z}/{x}/{y}.png?appid=230e569937af52cbff50af356d2501bb`}
                  />
                </LayersControl.Overlay>
              );
            }) }
          </LayersControl>
          <ScaleControl imperial={false} />
        </MapContainer>
      :
        <NoDataComponent text='Не выбран город' />
      }
    </>
  );
}
