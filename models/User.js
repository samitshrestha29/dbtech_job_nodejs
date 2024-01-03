const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    isAgent: { type: Boolean, default: false },
    skills: { type: Array, default: false },
    profile: {
      type: String,
      required: true,
      default:
        "https://images.pexels.com/photos/213780/pexels-photo-213780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
