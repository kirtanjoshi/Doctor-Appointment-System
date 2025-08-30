const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://doctor-appointment-system-1tpn.onrender.com/api'
  : 'http://localhost:4000/api';

export default API_BASE_URL;