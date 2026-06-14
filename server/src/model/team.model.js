import { model,Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    shortName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    logo: {
      type: String,
      required: true,
    },

    primaryColor: String,

    squadPlayers: [
      {
        type: Schema.Types.ObjectId,
        ref: "player",
      },
    ],
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
  { timestamps: true },
);

const teamModel = model("team", teamSchema);

export default teamModel;
