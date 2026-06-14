import express from "express";
import PublicSeriesController from "./series.controller.js";

const router = express.Router();

const controller = new PublicSeriesController();

router.get("/", controller.getSeries.bind(controller));

router.get("/:id", controller.getSeriesDetails.bind(controller))

export default router;
