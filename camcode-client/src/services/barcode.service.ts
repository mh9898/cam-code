import varCodeDev from './axios.config';

export type SendBarcodeParams = { barcode: string; long: number; lat: number };

export const sendBarcode = async ({ barcode, long, lat }: SendBarcodeParams) => {
  const params = { barcode, long, lat };
  console.log(params);
  const { data } = await varCodeDev.post('/proxy/barcode', params);
  return data;
};
export const sendFeedback = async (
  barcode: string,
  feedback: string,
  img: string | undefined,
  img2: string | undefined,
  img3: string | undefined
) => {
  const params = { barcode, feedback, img, img2, img3 };
  console.log(img, feedback);
  const { data } = await varCodeDev.post('/proxy/feedback', params);
  return data;
};
