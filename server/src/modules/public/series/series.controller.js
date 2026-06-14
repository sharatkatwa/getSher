import { StatusCodes } from "http-status-codes";
import PublicSeriesService from "./series.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class PublicSeriesController {
  constructor() {
    this.seriesService = new PublicSeriesService();
  }

  async getSeries(req, res) {
    const data = await this.seriesService.getSeries();

    return buildSuccessResponse(
      res,
      "Series fetched successfully",
      StatusCodes.OK,
      data,
    );
  }

  async getSeriesDetails(req, res) {
    const data = await this.seriesService.getSeriesDetails(req.params.id);
    return buildSuccessResponse(
      res,
      "Series details fetched successfully",
      StatusCodes.OK,
      data,
    );
  }
}
