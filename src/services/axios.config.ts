import axios from 'axios';

export default axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    // "Content-Type": "text/xml; charset=utf-8",
    // "Content-Length": 10000,
  },
});
