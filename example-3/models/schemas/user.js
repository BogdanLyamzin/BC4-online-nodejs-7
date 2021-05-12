const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs")

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

userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync())
}

userSchema.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = userSchema;
