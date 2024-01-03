const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("wrong login Detail");

      const decryptedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedPassword = decryptedPass.toString(CryptoJS.enc.Utf8);

      decryptedPassword !== req.body.password &&
        res.status(401).json("wrong password");

      res.status(200).json(user);
    } catch (error) {
      res.status(500);
    }
  },
};
