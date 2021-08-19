import axios from 'axios';

const url = 'http://localhost:5000/auth';

export const signup = (userId) => axios.post(`${url}/signup`, { userId });
export const login = (userId) => axios.post(`${url}/login`, { userId });