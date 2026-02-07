const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let mobileNo = req.body.mobileNo;
    let userType = req.body.userType;

    if (userName && password && mobileNo && email && userType) {
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res.status(409).json({ message: "This user is already registered" });
      } else {
        let newUser = userModel({
          userName,
          password,
          email,
          mobileNo,
          userType,
        });
        await newUser.save();
        res
          .status(201)
          .json({ message: "User Successfully Registered", newUser });
      }
    } else {
      res.status(400).json({ message: "Pls fill the required fields." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email } = req.body;
    let { password } = req.body;
    if (email && password) {
      let existingUser = await userModel.findOne({ email: email })
      if (existingUser) {
        if (existingUser.password == password) {
          let payload = {
            userName: existingUser.userName,
            email: existingUser.email,
            userType: existingUser.userType
          }
          let token = jwt.sign(payload, process.env.jwtSecretKey)

          res.status(200).json({ message: "Login Successfull", token })
        }
        else {
          res.status(400).json({ message: "Invalid Password" })
        }
      }
      else {
        res.status(400).json({ message: "User with this email id does not exist" })
      }
    }
    else {
      res.status(400).json({ message: "Pls fill the required fields" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })
  }
}

exports.googleLogin = async (req, res) => {
  try {
    let { email, userName, mobileNo, userType } = req.body;
    let existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      // User exists, generate token (no password check needed for Google Auth)
      let payload = {
        userName: existingUser.userName,
        email: existingUser.email,
        userType: existingUser.userType
      }
      let token = jwt.sign(payload, process.env.jwtSecretKey)

      res.status(200).json({ message: "Login Successful", token })
    }
    else {
      // New User - Check if we have all details
      if (mobileNo && userType) {
        let newUser = userModel({
          userName,
          password: "Google123", // Default password for Google users
          email,
          mobileNo,
          userType,
        });
        await newUser.save();
        let payload = {
          userName: newUser.userName,
          email: newUser.email,
          userType: newUser.userType
        }
        let token = jwt.sign(payload, process.env.jwtSecretKey)
        res
          .status(201)
          .json({ message: "User Successfully Registered", token });
      } else {
        // Missing details, tell frontend to ask user
        res.status(200).json({ message: "User not registered. Please complete profile.", isNewUser: true })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })
  }
}