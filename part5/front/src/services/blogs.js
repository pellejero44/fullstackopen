import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const unsetToken = () => {
  token = null;
};

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.post(baseUrl, newBlog, config);
  return data;
};

export default { getAll, setToken, create };
