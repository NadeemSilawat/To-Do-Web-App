const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // Add other fields like name, profilePic if needed
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
