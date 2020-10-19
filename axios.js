import axios from 'axios';

const headers = {'Content-Type': 'application/json'};
const instance = axios.create({
  baseURL: 'http://api.minu.mn/',
  headers,
});

export default instance;
