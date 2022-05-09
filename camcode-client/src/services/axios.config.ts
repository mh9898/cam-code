import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'https://camcode.varcode.com:8000/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    // "Content-Type": "text/xml; charset=utf-8",
    // "Content-Length": 10000,
  },
});
