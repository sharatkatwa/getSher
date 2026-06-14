import express from "express";
import PublicSeriesController from "./series.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();

const controller = new PublicSeriesController();

router.get("/", asyncHandler(controller.getSeries.bind(controller)));

router.get("/:id", asyncHandler(controller.getSeriesDetails.bind(controller)));

export default router;
