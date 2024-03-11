import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1bm55QDEyMyIsImlkIjoiNjVlYWNiN2U4ZTdkNzI3ZDQxNzU4MzhjIiwiaWF0IjoxNzEwMTcwNjc4LCJleHAiOjE3MTAxNzQyNzh9.JRRlQSsWnsa7NhD25YFwFh322R1dZVJSyTGSA7d6dv4';

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

export default {
  getAll: getAll,
  create: create,
};
