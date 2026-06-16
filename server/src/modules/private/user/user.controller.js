import { StatusCodes } from "http-status-codes";

import UserService from "./user.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req, res) {
    const users = await this.userService.getUsers();

    return buildSuccessResponse(
      res,
      "Users fetched successfully",
      StatusCodes.OK,
      users,
    );
  }

  async getUserById(req, res) {
    const user = await this.userService.getUserById(req.params.id);

    return buildSuccessResponse(
      res,
      "User fetched successfully",
      StatusCodes.OK,
      user,
    );
  }

  async updateUser(req, res) {
    const user = await this.userService.updateUser(req.params.id, req.body);

    return buildSuccessResponse(
      res,
      "User updated successfully",
      StatusCodes.OK,
      user,
    );
  }

  async deleteUser(req, res) {
    const user = await this.userService.deleteUser(req.params.id);

    return buildSuccessResponse(
      res,
      "User deleted successfully",
      StatusCodes.OK,
      user,
    );
  }
}
