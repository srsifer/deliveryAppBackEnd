import axios from 'axios';

async function apiRegister(newUser) {
  try {
    const url = 'http://localhost:3001/register';
    const fetchAPI = await axios.post(url, newUser);
    const response = fetchAPI.data;
    console.log(response);
    return response;
  } catch (error) {
    return error.message;
  }
}

export default apiRegister;
