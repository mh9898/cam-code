import axios from 'axios';

export default axios.create({
  baseURL: 'https://internal-apps.varcode.com:3443/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
