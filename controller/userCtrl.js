const { generatedToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const generateRefreshToken  = require("../config/refreshToken");
const sendEmail = require("./emailCtrl");


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
  console.log(findUser.password );
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser._id); 
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    });
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
const handlerToken = asyncHandler(async(req,res) =>{
const cookie = req.cookies
if(!cookie?.refreshToken) throw new Error(" No refresh cookies in the token")
const refreshToken = cookie.refreshToken
})

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        password: req?.body?.password,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

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
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id);

    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unBlocked = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user is unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async(req,res) =>{
  const {_id} = req.user
  const {password} = req.body
  validateMongoDbId(_id)
  const user = await User.findById(_id)
  if(password){
    user.password = password
    const updatePassword = await user.save()
    res.json(updatePassword)
  }
  else{
    res.json(user)
  }
})

const forgetPasswordToken = asyncHandler(async(req,res)=>{
  const {email} = req.body
  const user = await User.findOne({email})
  if(!user)throw new Error('user not found')
  try {
    const token = await user.createPasswordResetToken()
    await user.save()
    const resetURL = `Hi follow the link to reset your password <a href ="http://localhost:5000/api/user/reset-password/${token}">Click here</a>`
    const data = {
      to:email,
      text: "Hey user",
      subject: "forget password link",
      html: resetURL
    }
    sendEmail(data)
    res.json(token)
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }

})
module.exports = {
  createUser,
  loginUserCtrl,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockedUser,
  unBlocked,
  handlerToken,
  updatePassword,
  forgetPasswordToken
};
