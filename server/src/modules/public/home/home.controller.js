import { StatusCodes } from "http-status-codes";

import HomeService from "./home.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class HomeController {
  constructor() {
    this.homeService = new HomeService();
  }

  async getHomeFeed(req, res) {
    const homeFeed = await this.homeService.getHomeFeed();

    return buildSuccessResponse(
      res,
      "Home feed fetched successfully",
      StatusCodes.OK,
      homeFeed,
    );
  }
}
