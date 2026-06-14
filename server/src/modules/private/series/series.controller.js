import { StatusCodes } from "http-status-codes";
import SeriesService from "./series.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class SeriesController {
  constructor() {
    this.seriesService = new SeriesService();
  }

  async createSeries(req, res) {
    const series = await this.seriesService.createSeries(req.body);

    return buildSuccessResponse(
      res,
      "Series created successfully",
      StatusCodes.CREATED,
      series,
    );
  }

  async getAllSeries(req, res) {
    const series = await this.seriesService.getAllSeries();

    return buildSuccessResponse(
      res,
      "Series fetched successfully",
      StatusCodes.OK,
      series,
    );
  }

  async getSeriesById(req, res) {
    const series = await this.seriesService.getAllSeriesById(req.params.id);

    return buildSuccessResponse(
      res,
      "Series fetched successfully",
      StatusCodes.OK,
      series,
    );
  }

  async updateSeries(req, res) {
    const series = await this.seriesService.updateSeries(
      req.params.id,
      req.body,
    );

    return buildSuccessResponse(
      res,
      "Series updated successfully",
      StatusCodes.OK,
      series,
    );
  }

  async deleteSeries(req, res) {
    await this.seriesService.deleteSeries(req.params.id);

    return buildSuccessResponse(
      res,
      "Series deleted successfully",
      StatusCodes.OK,
      null,
    );
  }
}
