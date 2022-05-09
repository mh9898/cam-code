import varCodeDev from './axios.config';

export const SendBarcode = async (barcode: string, lat: string, long: string) => {
  const { data } = await varCodeDev.post('/barcode', { barcode, lat: lat, long: long });
  return data;
};
