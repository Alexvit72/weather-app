import React, { useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation
} from "react-router-dom";
import { Position } from '../interfaces/position';
import { MainData } from '../interfaces/loaders';

async function getPosition() {
  return new Promise((resolve: (value: GeolocationPosition) => void) => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => resolve(pos));
  })
  .then((result): Position => {
    return { lat: result.coords.latitude, lon: result.coords.longitude };
  })
}

export async function loader() {
  const geoPosition = await getPosition();
  return { geoPosition };
}


export default function Main() {

  const navigate = useNavigate();
  let location = useLocation();
  const { geoPosition } = useLoaderData() as MainData;
  useEffect(() => {
    if (location.pathname === '/') {
      navigate(`${geoPosition.lat}/${geoPosition.lon}/current`, { replace: true });
    }
  }, [location]);

  return <Outlet />;

}
