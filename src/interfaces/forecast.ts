import { Coord, Weather, Wind, Clouds, Rain, Main } from './common';

interface Sys {
  pod: string
}

interface City {
  coord: Coord,
  timezone: number,
  id: number,
  name: string,
  population: number,
  country: string,
  sunrise?: number,
  sunset?: number
}

export interface ForecastItem {
  clouds?: Clouds,
  dt: number,
  dt_txt: string,
  sys?: Sys,
  main: Main,
  pop?: number,
  visibility?: number,
  weather: Weather[],
  wind?: Wind,
  rain?: Rain,
  snow?: Rain
}

export interface Forecast {
  cod: string,
  message?: number,
  cnt: number,
  list: ForecastItem[],
  city: City
}
