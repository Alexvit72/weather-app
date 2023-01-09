import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useAppSelector } from '../app/hooks';

function Map() {
  const currentTown = useAppSelector((state) => state.towns.currentTown);

  const [layer, setLayer] = useState<string>('clouds');

  useEffect(() => {
    if (currentTown) {
      //setPos([currentTown.latitude, currentTown.longitude]);
    }
  }, [currentTown]);


  return (
    <>
      {currentTown ?
        <MapContainer className='h-full overflow-hidden' center={[currentTown.latitude, currentTown.longitude]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            attribution='Weather from <a href="https://openweathermap.org/" alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=230e569937af52cbff50af356d2501bb`}
          />
        </MapContainer>
      :
        null
      }
    </>
  );
}

export default Map;
