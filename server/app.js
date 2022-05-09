import axios from "axios";
import express from 'express';
import cors from 'cors';


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const varCodeDev = axios.create({
    baseURL: 'http://deltadev.mymdfile.com/ws/Service.asmx',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});
export const SendBarcode = async (barcode) => {
    try {
        const {data} = await varCodeDev.post('/SetBarcodeJson', {
            bDeliveryNoteFlag: true,
            sDeliveryNote: 'note-camcode-client',
            sUserName: 'name-camcode-client',
            sUserCompany: 'company-camcode-client',
            sUserAddress: 'add-camcode-client',
            sUserCountry: 'Country-camcode-client',
            sUserState: 'State-camcode-client',
            sUserPhone: '3334444-camcode-client',
            sUserZip: "",
            sUserEmail: 'email@-camcode-client',
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
    } catch (error) {
        console.log(error);
        return null
    }

};

// Handle GET requests to /api route
app.post("/api/barcode", async(req, res) => {
    const test = await SendBarcode(req.body.barcode)
    console.log(test)
    res.json({ message: JSON.parse(test.d) });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
})
const PORT = process.env.PORT || 3443;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
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
