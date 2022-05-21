import { Router } from "express";
import customThemeController from "../controller/customTheme.controller.js";

const customThemeRouter = Router();

customThemeRouter.get("/", customThemeController.getCustomTheme);
customThemeRouter.post("/", customThemeController.createCustomTheme);
export default customThemeRouter;
