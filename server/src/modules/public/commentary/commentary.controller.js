import { StatusCodes } from "http-status-codes";

import CommentaryService from "./commentary.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class CommentaryController {
  constructor() {
    this.commentaryService = new CommentaryService();
  }

  async getCommentaryByMatch(req, res) {
    const commentary = await this.commentaryService.getCommentaryByMatch(
      req.params.matchId,
    );

    return buildSuccessResponse(
      res,
      "Match commentary fetched successfully",
      StatusCodes.OK,
      commentary,
    );
  }
}
