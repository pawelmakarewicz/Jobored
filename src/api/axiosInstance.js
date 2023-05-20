import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com',
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp'
    }
  });

  export default axiosInstance