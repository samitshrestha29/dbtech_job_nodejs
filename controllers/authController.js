const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      //   CryptoJS.AES.encrypt(req.body.password, process.env.SECRET);

      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
