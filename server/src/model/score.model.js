import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreSchema = new Schema(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    innings: {
      type: Number,
      required: true,
      enum: [1, 2],
    },
    battingTeam: {
      type: Schema.Types.ObjectId,
      ref: "team",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
    },
    wickets: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    overs: {
      type: String,
      default: "0.0",
      match: [/^\d+\.[0-5]$/, "Overs must be in X.Y format where Y is 0-5"],
    },
    runRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    target: {
      type: Number,
      min: 0,
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
  { timestamps: true },
);

scoreSchema.index({ matchId: 1, innings: 1 }, { unique: true });

const Score = mongoose.model("score", scoreSchema);

export default Score;
