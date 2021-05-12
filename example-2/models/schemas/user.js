const {Schema} = require("mongoose");

const userSchema = Schema({
    login: {
        type: String,
        required: [true, "Login must be define!"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minLength: 6
    }
});

module.exports = userSchema;
