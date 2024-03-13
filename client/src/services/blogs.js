import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const config = () => ({
  headers: {
    Authorization: token,
  },
});

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject, config());
  return response.data;
};

const update = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config());

  return response.data;
};

export default {
  getAll: getAll,
  create: create,
  setToken: setToken,
  update: update,
  deleteBlog: deleteBlog,
};
