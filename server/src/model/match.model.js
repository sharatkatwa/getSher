import mongoose from "mongoose";
import { MATCH_STATUS } from "../constants/model.constant.js";

const { Schema } = mongoose;

const playingPlayerSchema = new Schema(
  {
    player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
    isCaptain: { type: Boolean, default: false },
    isWicketKeeper: { type: Boolean, default: false },
  },
  { _id: false },
);

const matchSchema = new Schema(
  {
    seriesId: { type: Schema.Types.ObjectId, ref: "series", required: true },
    matchNumber: String,
    venue: { type: String, required: true, trim: true },
    startTime: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(MATCH_STATUS),
      default: MATCH_STATUS.UPCOMING,
    },
    team1: { type: Schema.Types.ObjectId, ref: "team", required: true },
    team2: { type: Schema.Types.ObjectId, ref: "team", required: true },
    tossWinner: { type: Schema.Types.ObjectId, ref: "team" },
    tossDecision: { type: String, enum: ["BAT", "BOWL"] },
    playingXI: {
      team1: [playingPlayerSchema],
      team2: [playingPlayerSchema],
    },
    winner: { type: Schema.Types.ObjectId, ref: "team" },
    result: String,
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);

// Performance Optimizing Compound Indexes
matchSchema.index({ status: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ seriesId: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ team1: 1, startTime: -1, isDeleted: 1 });
matchSchema.index({ team2: 1, startTime: -1, isDeleted: 1 });

const Match = mongoose.model("Match", matchSchema);

export default Match;
