import express from "express";
import SeriesController from "./series.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();

const controller = new SeriesController();

router.post("/", asyncHandler(controller.createSeries.bind(controller)));

router.get("/", asyncHandler(controller.getAllSeries.bind(controller)));

router.get("/:id", asyncHandler(controller.getSeriesById.bind(controller)));

router.patch("/:id", asyncHandler(controller.updateSeries.bind(controller)));

router.delete("/:id", asyncHandler(controller.deleteSeries.bind(controller)));

export default router;
