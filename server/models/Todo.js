const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        board: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Board',
        },
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done'],
            default: 'todo',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Todo', todoSchema);
