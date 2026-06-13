import teamModel from "../model/team.model.js";

export default class TeamRepo {
  async create(payload) {
    return await teamModel.create(payload);
  }
  async findAll() {
    return await teamModel.find({ isDeleted: false }).lean();
  }
  
  async findById(id) {
    return await teamModel.findOne({ _id: id, isDeleted: false });
  }
  
  async updateById(id, payload) {
    return await teamModel.findByIdAndUpdate(id, payload, { new: true });
  }
  
  async deleteById(id) {
    return await teamModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }
}
