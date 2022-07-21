const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asynchandler = require("../middleware/async");

//  @desc           Register User
//  @route          POST /api/v1/auth/register
//  @access         Public         ! -- as it not gona be a loggedin user or else it would be

exports.register = asynchandler(async (req, res, next) => {
  
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});

//  @desc           Login User
//  @route          POST /api/v1/auth/login
//  @access         Public         ! -- as it not gona be a loggedin user or else it would be

exports.login = asynchandler(async (req, res, next) => {

  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password"), 400);
  }

  // check for user       //  its es6: email : email
  const user = await User.findOne({ email }).select("+password");
  // ^^^^^ what select will do here is it will include password wen a user is found, by default selection
  //  of password is false on fetch user

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  // if match is false then not it to enter
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// get token from model, create cookie and send responce.
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  const option = {
    // set to 30 days
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // what is it in token
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    // if its not it will create one , cookie will be sent wil https
    option.secure = true;
  }

  res
    .status(200)
    // name, value , options
    .cookie("token", token, option)
    .json({
      success: true,
      token,
      data:user
    });
};

//  @desc           Login User
//  @route          POST /api/v1/auth/me
//  @access         private         


exports.getMe = asynchandler(async (req , res , next) => {
     const user = await User.findById(req.user.id)


     res.status(200).json({
         success:true,
         data: user
     })
})