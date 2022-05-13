import varCodeDev from './axios.config';
import axios from "axios";

export const SendBarcode = async (barcode: string) => {
  const { data } = await axios.post('https://192.168.0.171/api/barcode', { barcode });
  return data;
};
