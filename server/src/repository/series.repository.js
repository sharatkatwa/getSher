import seriesModel from "../model/series.model.js";

export default class SeriesRepository {
  async create(payload) {
    return await seriesModel.create(payload);
  }

  async findById(id) {
    return await seriesModel.findById(id);
  }

  async findByName(name) {
    return await seriesModel.findOne({ name });
  }

  async findBySeason(season) {
    return await seriesModel.findOne({ season });
  }

  async findAll() {
    return await seriesModel.find();
  }

  async update(id, payload) {
    return await seriesModel.findByIdAndUpdate(id, payload, { returnDocument: "after" });
  }

  async delete(id) {
    return await seriesModel.findByIdAndDelete(id)
  }

}
