import express from "express";

import HomeController from "./home.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();
const homeController = new HomeController();

router.get("/", asyncHandler(homeController.getHomeFeed.bind(homeController)));

export default router;
