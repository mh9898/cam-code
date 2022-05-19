import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.set("base", "/api");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const varCodeDev = axios.create({
  baseURL: "http://deltadev.mymdfile.com/ws/Service.asmx",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
export const SendBarcode = async (barcode, lat, long) => {
  try {
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

// Handle GET requests to /api route
app.post("/api/barcode", async (req, res) => {
  const apiBarCodeResponse = await SendBarcode(
    req.body.barcode,
    req.body.lat,
    req.body.long
  );
  const result = JSON.parse(apiBarCodeResponse.d);
  console.log(result);
  if (result.scid == 0) {
    res.status(500).send({ message: "barcode scan error" });
    return;
  }
  res.json({
    message: JSON.parse(apiBarCodeResponse.d),
    lat: Number(req.body.lat),
    long: Number(req.body.long),
  });
});

app.get("/api", (req, res) => {
  res.send("Hello 2Wsssssorled!!");
});
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} - but on 443 in docker compose`);
});

// const sslServer = https.createServer(
//     {
//         key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//         cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//     },
//     app
// )
//
// sslServer.listen(3443, () => console.log('Secure server 🚀🔑 on port 3443'))
