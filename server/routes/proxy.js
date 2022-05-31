import { Router } from "express";
import { SendBarcode, sendFeedback } from "../services/barcode.service.js";

const proxyRouter = Router();

proxyRouter.post("/barcode", async (req, res) => {
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
  try{

  }catch (e) {

  }
  const feedbackRes = await sendFeedback({
    iScanID: req.body.iScanID,
    barcode: req.body.barcode,
    feedBack: req.body.feedback,
    img: req.body.img,
    img2: req.body.img2,
    img3: req.body.img3,
  });
  const result = JSON.parse(feedbackRes);
  console.log(feedbackRes)
  if (result.scid == 0) {
    res.status(500).send({ message: "feedback properties error" });
    return;
  }
  if(result === null){
    return res.status(501).send({message: "server didn't respond"})
  }
  res.json({
    message: result,
    lat: Number(req.body.lat),
    long: Number(req.body.long),
  });
});
export default proxyRouter;
