const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const Commuter = require("../models/commuter");


// checks if user is logged in, by accessing thed token and getting the user's unique property,
//  then get sthe loggedin user and attaches with th req's body.

exports.protect = asyncHandler(async (req, res, next) => {

  let token;  

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    
  }

  // else if(req.cookies.token){
  //     token = req.cookies.token
  // }

  // make sure token existis
  if (!token) {
    return next(
      new ErrorResponse("Not a authorized to access this route , no Token, plz login first", 401)
    );
  }

  try {
    // verify token, extarcting payload her, Payload Ex: {id: 1 , iat: xxx , expir: xxxx}
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const c = decoded.CNIC

    const a = await Commuter.find({CNIC : c});
    if(!a){
      return next(
        // not in database
        new ErrorResponse("user is not registered", 401)
      );
    }
    req.commuter = a
    next();
  } catch (err) {
    return next(
      new ErrorResponse("Not a authorized to access this route, you need to login first", 401)
    );
  }
  
});

// grant access to specific roles.
exports.authorize = (...roles) => {

  return (req, res, next) => {
    /*  here req.user is assigned as logged in user form above protect function , thus each req 
        will also include associated logged in user with it */

        // !--------  be aware req.user should be changed ti req.commuter. -------!


    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `user with role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
};

// Token Story

/*
Token is used to get USER Creds and his identity, we gives the User ID and JWT_SECRET to get back a token.
And then this token is sent in response to Register or login to backend.
In our case we use Bearer Token, in which we send in header authorization : bearer token (key/value). 
when ever we route to a protected route, in protected route we decode the token available in login in USER's header
or logged responce of login , this decoding is done by giving token and our JWT_SECRET, the decoded object 
gives us payload as this {id: 1 , iat: xxx , expir: xxxx} , here id is the USERS unique id , and now we can 
get the user who is performing action on protected route.
*/
