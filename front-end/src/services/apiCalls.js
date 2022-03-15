import axios from 'axios';

const getProducts = async () => {
  try {
    const url = 'http://localhost:3001/customer/products';
    const { token } = JSON.parse(localStorage.getItem('user'));
    const fetchAPI = await axios.get(url, { headers: {
      // eslint-disable-next-line
      Authorization: token,
    },
    });
    const response = await fetchAPI.data;

    return response;
  } catch (error) {
    return error.message;
  }
};

const getUsers = async () => {
  try {
    const url = 'http://localhost:3001/adminRegister';
    const { token } = JSON.parse(localStorage.getItem('user'));
    const fetchAPI = await axios.get(url, { headers: {
      // eslint-disable-next-line
      Authorization: token,
    },
    });
    const response = await fetchAPI.data;

    return response;
  } catch (error) {
    return error.message;
  }
};

const removeUser = async (id) => {
  try {
    const url = `http://localhost:3001/adminRegister/${id}`;
    const { token } = JSON.parse(localStorage.getItem('user'));
    const fetchAPI = await axios.post(url, { headers: {
      // eslint-disable-next-line
      authorization: token,
    },
    });
    const response = await fetchAPI.data;

    return response;
  } catch (error) {
    return error.message;
  }
};

export {
  getProducts,
  getUsers,
  removeUser,
};
