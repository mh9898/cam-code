import varCodeDev from './axios.config';

export const SendBarcode = async (barcode: string, long: number, lat: number) => {
  const params = { barcode, long, lat }
  console.log(params)
  const { data } = await varCodeDev.post('/barcode', params);
  return data;
};
