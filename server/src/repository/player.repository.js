import playerModel from "../model/player.model.js";

export default class PlayerRepo {
  async create(payload) {
    return await playerModel.create(payload);
  }

  async findAll() {
    return await playerModel.find({ isDeleted: false }).lean();
  }

  async findById(id) {
    return await playerModel.findOne({ _id: id, isDeleted: false }).lean();
  }

  async updateById(id, payload) {
    return await playerModel
      .findByIdAndUpdate(id, payload, { new: true })
      .lean();
  }

  async deleteById(id) {
    return await playerModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .lean();
  }
}
