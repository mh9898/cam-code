import axios from 'axios';

export default axios.create({
  baseURL: 'http://deltadev.mymdfile.com/ws/Service.asmx',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    // "Content-Type": "text/xml; charset=utf-8",
    // "Content-Length": 10000,
  },
});
