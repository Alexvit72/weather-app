import { Position } from './position';
import { CurrentWeather } from './current';
import { Forecast } from './forecast';

export type LayoutData = {
  position: Position,
  current: CurrentWeather,
  forecast: Forecast
}
