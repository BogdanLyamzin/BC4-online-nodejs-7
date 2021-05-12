const {Schema} = require("mongoose");

const contactSchema = {
    name: {
        type: String,
        required: [true, "Name must be"]
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }
}

module.exports = contactSchema