import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; // Update this if your backend URL is different

export const getTasks = async (token) => {
  try {
    const res = await axios.get(API_URL, { headers: { Authorization: token } });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addTask = async (task, token) => {
  try {
    const res = await axios.post(API_URL, task, { headers: { Authorization: token } });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateTask = async (id, task, token) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, task, { headers: { Authorization: token } });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteTask = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: token } });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
