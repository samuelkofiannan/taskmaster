import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update this if your backend URL is different

export const signUp = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { username, password });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const login = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { username, password });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUser = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/user`, { headers: { Authorization: token } });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
