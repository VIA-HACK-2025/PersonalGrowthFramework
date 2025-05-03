import { Types } from 'mongoose';
import { NodeModel } from '../../model/schemas'

export const createNode = async (parentId?: Types.ObjectId) => {
    return await NodeModel.create({ parentId });
};

export const getNode = async (id: Types.ObjectId) => {
    return await NodeModel.findOne({ _id: id });
};

export const getAllNodes = async () => {
    return await NodeModel.find();
};

export const deleteNodeById = async (id: Types.ObjectId) => {
    return await NodeModel.findByIdAndDelete(id);
};
