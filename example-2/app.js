const bcrypt = require("bcryptjs");

const password = "password";

const cryptPassword = bcrypt.hashSync(password);
// console.log(cryptPassword)
const cryptAndSaltPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
console.log(cryptAndSaltPassword)
