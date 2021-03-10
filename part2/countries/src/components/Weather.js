
import { useState } from 'react';
import weatherService from '../services/weatherService.js';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  weatherService.getWeather(capital).then(res => setWeather(res));

  if (weather === undefined) {
    return <p>Loading...</p>;
  } else {
    return (
      <form>
        <b>temperature</b> {weather.temperature}
        <br />
        <img src={weather.weather_icons[0]} alt='Loading...' />
        <br />
        <b>wind </b> {weather.wind_speed} <b> direction</b> {weather.wind_dir}
      </form>
    );
  }
};
export default Weather;