import express from "express";
import SeriesController from "./series.controller.js";

const router = express.Router();

const controller = new SeriesController();

router.post("/", controller.createSeries.bind(controller));

router.get("/", controller.getAllSeries.bind(controller));

router.get("/:id", controller.getSeriesById.bind(controller));

router.patch("/:id", controller.updateSeries.bind(controller));

router.delete("/:id", controller.deleteSeries.bind(controller));

export default router;
