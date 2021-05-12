const {model} = require("mongoose");

const contactSchema = require("./schemas/contact")

const Contact = model("contact", contactSchema);

// Contact.find({owner: userId}).populate()