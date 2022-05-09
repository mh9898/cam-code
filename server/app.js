import axios from "axios";

import express from 'express';
// const https = require('https')
import path from 'path';
import {fileURLToPath} from 'url';
// const fs = require('fs')

const app = express()
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const varCodeDev = axios.create({
    baseURL: 'http://deltadev.mymdfile.com/ws/Service.asmx',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // "Content-Type": "text/xml; charset=utf-8",
        // "Content-Length": 10000,
    },
});
export const SendBarcode = async (barcode, lat, long) => {
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
            dLatitud: lat,
            dLongitud: long,
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
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../dist')))

// Handle GET requests to /api route
app.post("/api/barcode", async(req, res) => {
    const test = await SendBarcode(req.body.barcode, req.body.lat, req.body.long);
    console.log(test)
    res.json({ message: JSON.parse(test.d) });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});
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
