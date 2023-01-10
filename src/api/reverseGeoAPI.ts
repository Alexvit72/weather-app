import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/reverse',
  timeout: 10000,
  params: {
    appid: '230e569937af52cbff50af356d2501bb',
    limit: 1
  }
});
