import { StatusCodes } from "http-status-codes";

import commentaryService from "./commentary.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

class CommentaryController {
  async addCommentary(req, res) {
    const userId = req.user?.id || req.user?._id || null;
    const commentary = await commentaryService.addCommentary(req.body, userId);

    return buildSuccessResponse(
      res,
      "Commentary created successfully",
      StatusCodes.CREATED,
      commentary,
    );
  }

  async deleteCommentary(req, res) {
    const commentary = await commentaryService.deleteCommentary(req.params.id);

    return buildSuccessResponse(
      res,
      "Commentary deleted successfully",
      StatusCodes.OK,
      commentary,
    );
  }
}

export default new CommentaryController();
