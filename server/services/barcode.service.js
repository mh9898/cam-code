import { varCodeDev } from "./axios.config.js";

export const SendBarcode = async (barcode, lat, long) => {
  try {
    console.log(barcode, lat, long);
    const { data } = await varCodeDev.post("/SetBarcodeJson", {
      bDeliveryNoteFlag: true,
      sDeliveryNote: "note-camcode-client",
      sUserName: "name-camcode-client",
      sUserCompany: "company-camcode-client",
      sUserAddress: "add-camcode-client",
      sUserCountry: "Country-camcode-client",
      sUserState: "State-camcode-client",
      sUserPhone: "3334444-camcode-client",
      sUserZip: "",
      sUserEmail: "email@-camcode-client",
      sswVersion: "",
      sdeviceType: "",
      sBarcode: barcode, //required
      sUpc: "upc",
      dLatitud: Number(lat),
      dLongitud: Number(long),
      Img: "",
      Img2: "",
      Img3: "",
      langCode: "",
      offlineTime: "",
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
