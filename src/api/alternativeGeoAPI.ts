import axios from 'axios';

export default axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1/',
  timeout: 10000,
  params: {
    language: 'ru',
    count: 100
  }
});
