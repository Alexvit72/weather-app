import axios from 'axios';

export default axios.create({
  baseURL: 'https://tile.openweathermap.org/map/',
  timeout: 10000,
  params: {
    appid: '230e569937af52cbff50af356d2501bb',
    lang: 'ru'
  }
});
