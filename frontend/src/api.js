import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://product-showcase-gvcc.onrender.com' 
});

export default api;
