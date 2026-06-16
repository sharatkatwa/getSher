import mongoose from "mongoose";

const { Schema } = mongoose;

export const COMMENTARY_TYPES = {
  NORMAL: "NORMAL",
  FOUR: "FOUR",
  SIX: "SIX",
  WICKET: "WICKET",
  MILESTONE: "MILESTONE",
};

const commentarySchema = new Schema(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    over: {
      type: Number,
      required: true,
      min: 0,
    },
    ball: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(COMMENTARY_TYPES),
      default: COMMENTARY_TYPES.NORMAL,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

commentarySchema.index({ matchId: 1, createdAt: -1 });

const Commentary = mongoose.model("Commentary", commentarySchema);

export default Commentary;
