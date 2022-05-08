import varCodeDev from './axios.config';

export const SendBarcode = async (barcode: string) => {
  const { data } = await varCodeDev.post('/barcode', { barcode });
  return data;
};
