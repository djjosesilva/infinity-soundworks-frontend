import axios from 'axios';

// Use HF Space directly (Netlify proxy times out on long requests)
const API_BASE = import.meta.env.PROD
  ? 'https://djjosesilva-infinity-soundworks-api.hf.space'
  : 'http://localhost:7860';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 180000,
});

const token = localStorage.getItem('token');
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default api;
