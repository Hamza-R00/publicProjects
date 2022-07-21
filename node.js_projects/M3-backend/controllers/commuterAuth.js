const Commuter = require("../models/commuter");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");

//  @desc           Register Commuter
//  @route          POST /api/v1/auth/register/commuter
//  @access         public        ! -- as it not gona be a loggedin user or else it would be

exports.registerCommuter = asyncHandler(async (req, res, next) => {

  console.log("yes in commuter Register")
console.log(req.body)

  const { name, CNIC, phoneNumber, carReg } = req.body;

  const commuter = await Commuter.create({
    name,
    CNIC,
    phoneNumber,
    carReg,
  });

  const token = await commuter.getSignedJwtToken();

  res.status(200).json({
  
    success: true,
    authToken: token,
  
  });

});









//  @desc           Register Commuter
//  @route          POST /api/v1/auth/login/commuter
//  @access         public        ! -- as it not gona be a loggedin user or else it would be

exports.loginCommuter = asyncHandler(async (req, res, next) => {
  console.log("In Login Commuter".red);

  var commuter;

  const { carReg, model, phoneNumber } = req.body;
  console.log("cheking body");
  console.log(req.body);
  console.log("below is my phone number , carReg , model ");
  console.log(phoneNumber);
  console.log(carReg);
  console.log(model);
  // add this info to JourneySchema  !!!!

  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
    // && !phoneNumber
  ) {
    let token = req.headers.authorization.split(" ")[1];
    if (token != "null") {
      console.log("we have received a token from a login".yellow);

      // token = token.replace('"', '')
      // token = token.replace('"', '')

      // get the user using Payload from the token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);
      commuter = await Commuter.findOne({ CNIC: decoded.CNIC });  
      token = await commuter.getSignedJwtToken();

      console.log("before if statment");
      if (commuter) {
        res.status(200).json({
          success: true,
          commuter: commuter,
          authToken: token,
        });
      }

      console.log("Getting it via Token");
      return;
    }
    
    console.log("Getting it via Token");
  }

  if (!commuter && !phoneNumber) {
    console.log("No Token and No Phone Number");
    res.status(200).json({
      success: false,
      msg: "Check this users registration via phone Number",
      operationCode: 1134,
    });

    return;
  }

  if (!commuter && phoneNumber) {
    console.log("yes in phoneNumber");
    console.log(phoneNumber);
    commuter = await Commuter.findOne({ phoneNumber: phoneNumber });
    if (!commuter) {
      console.log("no commuter via phone Number");
      return next(new ErrorResponse(" you are not regidtered user", 400));
    }
    const token = await commuter.getSignedJwtToken();

    console.log("this is my commuter");
    console.log(commuter);

    console.log("we are in phone number if statemnt");
    res.status(200).json({
      success: true,
      commuter: commuter,
      authToken: token,
    });
    

    console.log("getting it via PhoneNUmber");
    return;
  }
});
