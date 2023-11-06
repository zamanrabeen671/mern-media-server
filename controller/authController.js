const Auth = require("../model/authModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
// user Registration handler
const saveUser = async (req, res) => {
  try {
    const { userId, username, email, phone, photo } = req.body;
    const filter = { email };
    const update = { userId, username, email, phone, photo };
    const options = {
      upsert: true,
      new: true,
    }
    const savedUser = await Auth.findOneAndUpdate(filter, update, options);
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'An error occurred' });
  }
}
// const register = async (req, res) => {
//   const { email } = req.body;
//   // check for existing email or phone
//   const isUserExists = await Auth.findOne({ email: email });
//   if (isUserExists) {
//     return res.status(400).json({
//       message: `user already exist in this email ${email}`,
//       status: "Failed",
//     });
//   }
//   // create new user
//   const user = new Auth(req.body);
//   try {
//     // generate salt to hash password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     const savedUser = await user.save();
//     return res.status(201).json({
//       message: "user created successfully",
//       user: `user created id: ${savedUser._id}`,
//       status: 'success',
//       role: req.body.role
//     });
//   } catch (error) {
//     console.log(error)
//     return res.status(400).json({
//       message: error.message,
//       status: "Failed",
//     });
//   }
// };

// // login handler

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // fetch user from DB

//     const user = await Auth.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User   not exists",
//         status: "failed",
//       });
//     }

//     // validate password
//     const validatePassword = await bcrypt.compare(password, user.password);

//     if (!validatePassword) {
//       return res.status(403).json({
//         message: `User email or password not exists`,
//         status: "failed",
//       });
//     }
//     // create jwt token

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//         status: user.status,
//       },
//       process.env.AUTH_SECRET
//     );
//     let signedInUser = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//       role: user.role,
//       phone: user.phone,
//       status: user.status,
//     };

//     return res.status(200).json({
//       message: "logged in",
//       status: "success",
//       token,
//       signedInUser,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       status: "failed",
//     });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find({});
    return res.status(200).json({
      message: "get all users successfully",
      status: "success",
      total: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {

    const user = await Auth.find({ _id: id });
    return res.status(200).json({
      message: `user found`,
      status: "Success",
      user: user[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failed",
    });

  };
}

const userChecked = async (req, res) => {
  const id = req.params.userId;
  try {

    const user = await Auth.find({ userId: id });
    return res.status(200).json({
      message: `user found`,
      status: "Success",
      user: user[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failed",
    });

  };
}

const updateUserProfile = async (req, res) => {
  if (req.body.username) {
    try {
      const updatedData = await Auth.findByIdAndUpdate(
        { _id: req.body.userId },
        {
          $set: {
            username: req.body.username,
          },
        }
      );
      res.status(200).json({
        message: `username  updated successfully`,
        status: "success",
        updatedData,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: "failed",
      });
    }
  }
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const updatedData = await Auth.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { password: hashPassword } }
      );
      res.status(200).json({
        message: `Password  updated successfully`,
        status: "success",
        updatedData,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: "failed",
      });
    }
  }

  // both changed

  // if (req.body.password && req.body.username) {
  //   console.log(req.body.password, req.body.username);
  //   try {
  //     const hashPassword = await bcrypt.hash(req.body.password, 10);
  //     const updatedData = await Auth.findOneAndUpdate(
  //       { _id: req.body.id },
  //       { $set: { username: req.body.username, password: hashPassword } }
  //     );
  //     res.status(200).json({
  //       message: `username and password  updated successfully`,
  //       status: "success",
  //       updatedData,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: error.message,
  //       status: "failed",
  //     });
  //   }
  // }
};

module.exports = {
  saveUser,
  // register,
  // login,
  // getAllTeachers,
  getAllUsers,
  // getUserById,
  // banUserById,
  getUserById,
  updateUserProfile,
  userChecked
};
