import { Router } from "express";
import { SendBarcode } from "../services/barcode.service.js";

const proxyRouter = Router();

proxyRouter.post("/barcode", async (req, res) => {
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
    message: result,
    lat: Number(req.body.lat),
    long: Number(req.body.long),
  });
});
export default proxyRouter;
