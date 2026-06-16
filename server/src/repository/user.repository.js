import userModel from "../model/user.model.js"

export default class UserRepo {
    async create(payload){
        return await userModel.create(payload);
    }
    async findByEmail (email){
        return await userModel.findOne({ email, isDeleted: false }).lean();
    }
    async findById (id) {
        return await userModel.findOne({ _id: id, isDeleted: false }).lean();
    }
    async findAll() {
        return await userModel
            .find({ isDeleted: false })
            .select("-password")
            .sort({ createdAt: -1 })
            .lean();
    }
    async findPublicById(id) {
        return await userModel
            .findOne({ _id: id, isDeleted: false })
            .select("-password")
            .lean();
    }
    async updateById(id, payload) {
        return await userModel
            .findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
                new: true,
            })
            .select("-password")
            .lean();
    }
    async deleteById(id) {
        return await userModel
            .findOneAndUpdate(
                { _id: id, isDeleted: false },
                { isDeleted: true },
                { new: true },
            )
            .select("-password")
            .lean();
    }
}
