import axios from "axios";

export const varCodeDev = axios.create({
  baseURL: "http://varcodeglobal.mymdfile.com/ws/Service.asmx",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
