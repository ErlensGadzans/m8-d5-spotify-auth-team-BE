const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    email: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = model("User", UserSchema);
