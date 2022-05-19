import varCodeDev from './axios.config';

export type SendBarcodeParams = { barcode: string; long: number; lat: number };

export const sendBarcode = async ({ barcode, long, lat }: SendBarcodeParams) => {
  const params = { barcode, long, lat };
  console.log(params);
  const { data } = await varCodeDev.post('/barcode', params);
  return data;
};
