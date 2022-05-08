import varCodeDev from './axios.config';

export const SendBarcode = async (barcode: string) => {
  const { data } = await varCodeDev.post('/SetBarcodeJson', {
    bDeliveryNoteFlag: true,
    sDeliveryNote: 'note',
    sUserName: 'name',
    sUserCompany: 'company',
    sUserAddress: '',
    sUserCountry: 'Country',
    sUserState: 'State',
    sUserPhone: '3334444', //requiredrequired
    sUserEmail: '',
    sswVersion: '',
    sdeviceType: '',
    sBarcode: barcode, //required
    sUpc: 'upc',
    dLatitud: 0.0,
    dLongitud: 0.0,
    Img: '',
    Img2: '',
    Img3: '',
    langCode: '',
    offlineTime: '',
  });
  return data;
};
