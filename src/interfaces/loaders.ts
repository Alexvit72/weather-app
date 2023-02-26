import { CurrentWeather } from './current';
import { Forecast } from './forecast';
import { Position } from './position';
import { Town } from './towns';

export type LayoutData = {
  current: CurrentWeather,
  forecast: Forecast
}

export type MainData = {
  geoPosition: Position
}

export type TownsData = {
  towns: Town[]
}
