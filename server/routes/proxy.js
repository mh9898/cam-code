import { Router } from "express";
import { SendBarcode, sendFeedback } from "../services/barcode.service.js";

const proxyRouter = Router();

proxyRouter.post("/barcode", async (req, res) => {
  console.log(req.body);
  const apiBarCodeResponse = await SendBarcode({
    barcode: req.body.barcode,
    lat: req.body.lat,
    long: req.body.long,
  });
  const result = JSON.parse(apiBarCodeResponse.d);
  if (result.scid == 0) {
    res.status(500).send({ message: "barcode scan error" });
    return;
  }
  res.json({
    message: result,
    lat: Number(req.body.lat),
    long: Number(req.body.long),
  });
});
proxyRouter.post("/feedback", async (req, res) => {
  console.log(req.body);
  const apiBarCodeResponse = await sendFeedback({
    iScanID: req.body.iScanID,
    barcode: req.body.barcode,
    feedBack: req.body.feedback,
    img: req.body.img,
    img2: req.body.img2,
    img3: req.body.img3,
  });
  const result = JSON.parse(apiBarCodeResponse.d);
  if (result.scid == 0) {
    res.status(500).send({ message: "feedback send error" });
    return;
  }
  res.json({
    message: result,
    lat: Number(req.body.lat),
    long: Number(req.body.long),
  });
});
export default proxyRouter;
