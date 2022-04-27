const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: false,
  },
  Etype: {
    name: { type: String },
    description: { type: String, possibleValues: ["wfh", "from office"] },
  },
  dob: {
    type: Date,
  },
  hobbies: {
    type: String,
  },
});

const User = mongoose.model("userData", userSchema)
module.exports = User