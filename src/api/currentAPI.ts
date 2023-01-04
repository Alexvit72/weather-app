import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 10000,
  params: {
    appid: '230e569937af52cbff50af356d2501bb',
    units: 'metric',
    lang: 'ru'
  }
});
