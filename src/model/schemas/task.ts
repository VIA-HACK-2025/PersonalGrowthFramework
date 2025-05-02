import mongoose, { Schema } from 'mongoose';

const TaskSchema: Schema = new Schema({
    parentId: {
        type: Number,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'not-completed'],
        required: true,
    },
});

const TaskModel = mongoose.model('Task', TaskSchema);

export { TaskModel, TaskSchema }