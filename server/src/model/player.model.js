import { model, Schema } from "mongoose";
import { PLAYER_ROLES } from "../constants/model.constant.js"

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(PLAYER_ROLES),
      required: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    battingStyle: {
      type: String,
      required: true,
      trim: true,
    },

    bowlingStyle: {
      type: String,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const playerModel = model("player", playerSchema);

export default playerModel;
