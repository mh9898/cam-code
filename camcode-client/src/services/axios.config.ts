import axios from 'axios';

export default axios.create({
  baseURL: 'https://camcode-test.varcode.com:3443/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
