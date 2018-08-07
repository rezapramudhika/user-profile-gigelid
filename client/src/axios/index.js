import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
    timeout: 30000,
    baseURL: 'http://localhost:3000',
    headers: { token }
})

export default instance;
