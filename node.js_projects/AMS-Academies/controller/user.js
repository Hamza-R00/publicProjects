const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asynchandler = require("../middleware/async");
const advancedResults = require("../middleware/advanceResults");
const res = require("express/lib/response");

//  @desc           GET all User
//  @route          GET /api/v1/auth/user
//  @access         Private/Admin
exports.getUsers = asynchandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//  @desc           GET Specific User
//  @route          GET /api/v1/auth/user/:id
//  @access         Private/Admin
exports.getUser = asynchandler(async (req, res, next) => {

  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(
      new ErrorResponse(`user with ID: ${req.params.id} cant be found`, 404)
    );
  }

  res.status(200).json({
      success:true,
      data: user
  })
});

//  @desc           Create New User
//  @route          POST /api/v1/user
//  @access         Private/Admin
exports.createUser = asynchandler(async (req, res, next) => {
  const user = await User.create(req.body);

  // 201 is for creating user
  res.status(201).json({
    success: true,
    data: user,
  });
});

//  @desc           Update a Existing User
//  @route          PUT /api/v1/user/:id
//  @access         Private/Admin
exports.updateUser = asynchandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(`user with ID: ${req.params.id} cant be found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

//  @desc           Delete an Existing User
//  @route          Delete /api/v1/user/:id
//  @access         Private/Admin
exports.deleteUser = asynchandler(async (req, res, next) => {
   const  user =  await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`user with ID: ${req.params.id} cant be found`, 404)
    );
  }

  res.status(200).json({
    status: true,
    data: {},
  });
});
