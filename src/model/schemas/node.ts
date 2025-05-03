import mongoose, { Schema, Types } from 'mongoose';

const NodeSchema: Schema = new Schema({
    parentId: {
        type: Types.ObjectId,
        required: false,
    },
    children: {
        type: [Types.ObjectId],
        ref: "Node",
        default: undefined,
    },
    data: {
        type: [Types.ObjectId],
        ref: "Task",
        default: undefined,
    },
    info: {
        type: {
            title: {
                type: String,
                required: false,
            },
            icon: {
                type: String,
                required: false,
            },
        },
        required: false,
    },
});


const NodeModel = mongoose.model('Node', NodeSchema);

export { NodeModel };
