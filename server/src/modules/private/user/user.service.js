import mongoose from "mongoose";

import UserRepo from "../../../repository/user.repository.js";
import { ROLES } from "../../../constants/model.constant.js";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";

export default class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async getUsers() {
    return await this.userRepo.findAll();
  }

  async getUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError("Invalid user id");
    }

    const user = await this.userRepo.findPublicById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async updateUser(id, payload) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError("Invalid user id");
    }

    const allowedFields = ["name", "email", "role"];
    const updatePayload = {};

    for (const field of allowedFields) {
      if (payload[field] !== undefined) {
        updatePayload[field] = payload[field];
      }
    }

    if (!Object.keys(updatePayload).length) {
      throw new ValidationError("No valid user fields provided");
    }

    if (updatePayload.role && !Object.values(ROLES).includes(updatePayload.role)) {
      throw new ValidationError("Invalid user role");
    }

    if (updatePayload.email) {
      const existingUser = await this.userRepo.findByEmail(updatePayload.email);

      if (existingUser && existingUser._id.toString() !== id) {
        throw new ConflictError("Email already registered");
      }
    }

    const user = await this.userRepo.updateById(id, updatePayload);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async deleteUser(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError("Invalid user id");
    }

    const user = await this.userRepo.deleteById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
