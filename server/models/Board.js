const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Board', boardSchema);
