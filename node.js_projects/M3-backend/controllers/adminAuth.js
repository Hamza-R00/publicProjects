const Admin = require("../models/admin");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
//  @desc           Register Admin
//  @route          POST /api/v1/auth/register/admin
//  @access         public         ! -- as it not gona be a loggedin user or else it would be

exports.  registerAdmin = asyncHandler(async (req, res, next) => {

  console.log("In registerAdmin");
  console.log(req.body);

  const { name, email, designation, password } = req.body;

  const admin = await Admin.create({
    name,
    designation,
    email,
    password,
  });

  const token = admin.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token: token,
  });
});

//  @desc           Login Admin
//  @route          POST /api/v1/auth/login/admin
//  @access         private         ! -- as it not gona be a loggedin user or else it would be

exports.loginAdmin = asyncHandler( async (req, res, next) => {
    
    const { email, password } = req.body;

    console.log("in login")


    if (
      req.headers.authorization &&
      req.headers.authorization?.startsWith("Bearer")
    ) {
      const token = req.headers.authorization?.split(" ")[1]
   
    } 
   
  if (!email || !password) {
    return next(
      new ErrorResponse("please provide an email and a password"),
      400
    );
  }

  const admin = await  Admin.findOne({ email }).select("+password");
  
  if (!admin) {
    return next(new ErrorResponse("user does not exists" , 400));
  }
  
  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    return next( new ErrorResponse("You have entered invalid password",400));
  }

  sendTokenResponse(admin, 200, res);

});

const sendTokenResponse = (admin, statusCode, res) => {
  const token =  admin.getSignedJwtToken();

  const option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    // if its not it will create one , cookie will be sent wil https
    option.secure = true;
  }

  res.status(statusCode)
  .cookie("token" , token , option)
  .json({
      success:true,
      token,
      data:admin
  })
};
