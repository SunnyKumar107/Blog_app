import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  // console.log(response.data);
  return response.data;
};

// const loginUser = (credentials) => {
//   const request = axios.post(baseUrl, credentials);
//   return request.then((res) => res.data);
// };

export default {
  login: login,
};
