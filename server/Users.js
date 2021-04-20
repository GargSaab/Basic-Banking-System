const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  Current_Bal: Number,
});

mongoose.model("UserData", UserSchema);
