const {model, Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const emailSchema = require("./schemas");

const userSchema = Schema({
    login: {
        type: String,
        required: [true, "Login must be define!"]
    },
    email: emailSchema,
    password: {
        type: String,
        required: [true, "Password required"],
        minLength: 6
    }
});

userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync())
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = model("user", userSchema);

module.exports = User;