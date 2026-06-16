import { model, Schema } from "mongoose";
import { SERIES_STATUS } from "../constants/model.constant.js";
const seriesSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    shortName: { type: String, required: true, trim: true },
    season: { type: String, required: true, trim: true, unique: true },
    status: {
      type: String,
      enum: Object.values(SERIES_STATUS),
      default: "UPCOMING",
    },
    logo: String,
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);

const seriesModel = model("series", seriesSchema);

export default seriesModel;
