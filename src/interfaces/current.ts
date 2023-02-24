import { Coord, Weather, Wind, Clouds, Rain, Main } from './common';

interface Sys {
  type?: number,
  id: number,
  message?: string,
  country?: string,
  sunrise: number,
  sunset: number
}

export interface CurrentWeather {
  coord: Coord,
  weather: Weather[],
  base: string,
  main: Main,
  visibility?: number,
  wind?: Wind,
  rain?: Rain,
  snow?: Rain,
  clouds?: Clouds,
  dt: number,
  sys: Sys,
  timezone: number,
  id: number,
  name: string,
  cod: number
}
