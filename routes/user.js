const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {

    try {
      const { first_name, last_name, email, password } = req.body;  
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }

      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
  
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }

  });
  
  router.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;  
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });
  
  router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
module.exports = router;