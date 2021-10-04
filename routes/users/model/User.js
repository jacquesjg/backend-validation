const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            unique: false,
        },
        email: {
            type: String,
            unique: false,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);