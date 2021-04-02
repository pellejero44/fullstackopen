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

const update = async (blogToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.put(
    `${baseUrl}/${blogToUpdate.id}`,
    blogToUpdate,
    config
  );
  return data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.delete(`${baseUrl}/${id}`, config);
  return data;
};

export default { getAll, setToken, unsetToken, create, update, remove };
