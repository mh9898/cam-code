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
    const dataToSend = {
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
      sBarcode: barcode ?? "12312312", //required
      sUpc: "upc",
      dLatitud: Number(lat) || 0.0,
      dLongitud: Number(long) || 0.0,
      Img: img || " ",
      Img2: img2 || " ",
      Img3: img3 || " ",
      langCode: "",
      offlineTime: "",
    };
    console.log(dataToSend);
    const { data } = await varCodeDev.post("/SetBarcodeJson", dataToSend);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const sendFeedback = async ({
  iScanID,
  barcode,
  feedBack,
  img,
  img2,
  img3,
}) => {
  try {
    const dataToSend = {
      sAuthToken: "v3Tr#eus",
      sDeliveryNote: feedBack || "SUCCESSFULLY FELIVERD",
      sFeedback: feedBack || "no-feedback",
      iScanID,
      sUpc: barcode,
      Img: img || " ",
      Img2: img2 || " ",
      Img3: img3 || " ",
    };
    console.log(dataToSend);
    const { data } = await varCodeDev.post("/SetBarcodeJson", dataToSend);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
