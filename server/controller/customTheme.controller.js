import customThemeModel from "../models/customTheme.model.js";

const customThemeController = {
  async getCustomTheme(req, res) {
    try {
      const customTheme = await customThemeModel.findById(req.params.id);
      res.status(200).json(customTheme);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async createCustomTheme(req, res) {
    try {
      console.log(req.body);
      const customTheme = await customThemeModel.create(req.body);
      res.status(201).json(customTheme);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
export default customThemeController;
