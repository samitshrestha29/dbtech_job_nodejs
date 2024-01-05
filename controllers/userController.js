const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString();
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      const { password, __v, createdAt, ...others } = updateUser.toObject();
      res.status(200).json(others);
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server Error");
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account successfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUser: async (req, res) => {
    try {
      console.log("Fetching all users from the database...");
      const allUsers = await User.find();
      console.log("Users retrieved successfully:", allUsers);
      res.status(200).json(allUsers);
    } catch (error) {
      console.error("Error while fetching users:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },
};
