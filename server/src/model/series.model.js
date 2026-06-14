import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Basic index for listing active series
seriesSchema.index({ isDeleted: 1, createdAt: -1 });

const Series = mongoose.model("Series", seriesSchema);
export default Series;