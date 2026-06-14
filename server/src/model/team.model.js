import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    shortName: { type: String, required: true, trim: true }, // e.g., "IND", "AUS"
    logo: { type: String, default: "" }, // URL to image string
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Index to ensure fast lookups by name
teamSchema.index({ name: 1, isDeleted: 1 });

const Team = mongoose.model("Team", teamSchema);
export default Team;