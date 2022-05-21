import pkg from "mongoose";
const { Schema, model } = pkg;
const commentsSchema = new Schema({
  notchBG: {
    type: String,
    required: true,
  },
  fontColor: {
    type: String,
    required: true,
  },
  contentBG: {
    type: String,
    required: true,
  },
  headerIconIMG: {
    type: String,
    required: true,
  },
  headerIconURL: {
    type: String,
    required: true,
  },
  scanBarcodeInfoText: {
    type: String,
    required: true,
  },
  themeName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  websiteLink: {
    type: String,
    required: true,
  },
});

export default model("Custom-Themes", commentsSchema);
