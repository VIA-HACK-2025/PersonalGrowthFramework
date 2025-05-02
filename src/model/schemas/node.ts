import mongoose, { Schema } from 'mongoose';
import { TaskSchema } from './task.js';

const NodeSchema: Schema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    parentId: {
        type: Number,
        required: false,
    },
    children: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Node',
        default: [],
    },
    data: {
        type: [TaskSchema],
        default: [],
    },
});

const NodeModel = mongoose.model('Node', NodeSchema);

export { NodeModel };
