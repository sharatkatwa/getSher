import Series from "../model/series.model.js";

class SeriesRepository {
  async findById(seriesId) {
    return await Series.findOne({
      _id: seriesId,
      isDeleted: false,
    });
  }

  async exists(seriesId) {
    return await Series.exists({
      _id: seriesId,
      isDeleted: false,
    });
  }
}

export default new SeriesRepository();