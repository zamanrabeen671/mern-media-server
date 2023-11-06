const router = require("express").Router();
const {
  getAllUsers,
  updateUserProfile,
  saveUser,
  userChecked,
  getUserById
} = require("../controller/authController.js");
const {
  validateRegister,
  validateLogin,
} = require("../helper/authValidation.js");
const verifyToken = require("../helper/verifyToken.js");

// register an user
router.post("/saveUser", validateRegister, saveUser);
router.get('/:id', getUserById)
router.get('/checkedUser/:userId', userChecked)
// login user

// router.post("/login", validateLogin, login);

// get all users

router.get("/allUser", getAllUsers);

// get all teachers == admin access only

// router.get("/teachers", verifyToken, getAllTeachers);

// router.get('/user/:id', verifyToken, getUserById)
// router.delete('/banuser/:id', verifyToken, banUserById)
// update user profile data

router.patch("/update-user", updateUserProfile);

module.exports = router;
