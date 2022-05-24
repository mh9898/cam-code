import { varCodeDev } from "./axios.config.js";

export const SendBarcode = async ({
  barcode,
  lat,
  long,
  feedBack,
  img,
  img2,
  img3,
}) => {
  try {
    const { data } = await varCodeDev.post("/SetBarcodeJson", {
      bDeliveryNoteFlag: true,
      sDeliveryNote: feedBack || "no-feedback",
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
      dLatitud: Number(lat) || 0.0,
      dLongitud: Number(long) || 0.0,
      Img: img || " ",
      Img2: img2 || " ",
      Img3: img3 || " ",
      langCode: "",
      offlineTime: "",
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
