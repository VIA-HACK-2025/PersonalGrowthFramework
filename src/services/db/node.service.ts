import { NodeModel } from '../../model/schemas'

export const createNode = async (parentId?: number) => {
    return await NodeModel.create({ parentId });
};

export const getNode = async (id: number) => {
    return await NodeModel.findOne({ id });
};

export const getAllNodes = async () => {
    return await NodeModel.find();
};

export const deleteNodeById = async (id: number) => {
    return await NodeModel.findByIdAndDelete(id);
};
