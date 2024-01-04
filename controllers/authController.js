const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  // controllers/authController.js
  // ...

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
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).json("Wrong login details");

      const decryptedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedPassword = decryptedPass.toString(CryptoJS.enc.Utf8);

      if (decryptedPassword !== req.body.password) {
        return res.status(401).json("Wrong password");
      }

      // Generate a token for the logged-in user
      const token = jwt.sign({ id: user._id }, process.env.SECRET);

      // Exclude sensitive information from the user data
      const { password, __v, createdAt, ...userData } = user._doc;

      // Send the user details and token in the response
      res.status(200).json({ ...userData, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
