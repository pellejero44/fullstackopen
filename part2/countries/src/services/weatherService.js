import axios from 'axios';

const baseUrl = process.env.REACT_APP_WHEATHERSTACK_API;

const getWeather = async capital => {
  const response = await axios.get(`${baseUrl}&query=${capital}`);
  return response.data.current;
};

const weatherService = {getWeather}

export default weatherService;