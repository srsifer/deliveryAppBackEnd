import axios from 'axios';

async function apiRegister(newUser) {
  try {
    const url = 'http://localhost:3001/adminRegister';
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        authorization: token,
      },
    };

    const fetchAPI = await axios.post(url, newUser, config);
    const response = await fetchAPI.data;
    return response;
  } catch (error) {
    return { error };
  }
}

export default apiRegister;
