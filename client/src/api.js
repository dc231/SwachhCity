import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';

const baseURL = isProduction
  ? 'https://swachh-tracker-api.onrender.com'  
  : 'http://localhost:4000'; 

const API = axios.create({
  baseURL: baseURL , 
  withCredentials: true,   
});

export default API;
