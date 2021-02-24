const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
});

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email }); //FIRST LOOKING FOR USERNAME IN LIST. "THIS" IS SEARCHING FROM SCHEMA

  if (user) {
    //IF THERE IS A USER, THEN ARE LOOKIN FOR PASWORD TO MATCH
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
    // else return null;
  } else {
    return null;
  }
};

UserSchema.pre("save", async function (next) {
  //pre saving authors data
  const user = this;
  const plainPW = user.password;

  if (user.isModified("password")) {
    // modifying pasword of author
    user.password = await bcrypt.hash(plainPW, 12);
  }
  next();
});

module.exports = model("User", UserSchema);
