import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) =>{

let token ;

token = req.cookies.jwt;

// Fallback: Check Authorization header if cookie is missing
if (!token && req.headers.authorization?.startsWith('Bearer')) {
  token = req.headers.authorization.split(' ')[1];
}

if (token) {

    try{
     const decoded = jwt.verify (token, process.env.JWT_SECRET);

     req.user=await User.findById(decoded.userId).select('-password');

     next ();
    } catch (error) {
      res.status(401);
      throw new Error ('Not authorized, invalid token');
    }

} else {

    res.status (401);
    throw new Error ('Not authorized, no token');
}

} );

export { protect };