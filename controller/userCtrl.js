const { generatedToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(201).json({
      msg: "User created",
    });
  } else {
    throw new Error("User already exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      password: findUser?.password,
      token: generatedToken(findUser?._id),
    });
  } else {
    throw new Error("invalid credentials");
  }
});

const updateUser = asyncHandler(async(req,res) =>{
const {id} = req.params
try {
  const updateUser = await User.findByIdAndUpdate(id,{
    firstname: req?.body?.firstname,
    lastname: req?.body?.lastname,
    email: req?.body?.email,
    mobile: req?.body?.mobile,
    password: req?.body?.password,
  },
  {
    new: true
  }
);
res.json(updateUser)
} catch (error) {
  throw new Error(error)
}
})

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaUser = await User.findById(id)
    
    res.json({
      getaUser
    })
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id)
    res.json({
      deleteUser
    })
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createUser, loginUserCtrl, getAllUsers, getUser,deleteUser,updateUser };
