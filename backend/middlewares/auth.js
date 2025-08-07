import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("Cookies received:", req.cookies);

  const token = req.cookies.adminToken;
  if (!token) {
    console.log("No adminToken found");
    return next(new ErrorHandler("admin is not authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("Decoded token:", decoded);

  req.user = await User.findById(decoded.id);
  console.log("User from DB:", req.user);

  if (!req.user) {
    return next(new ErrorHandler("User not found!", 401));
  }

  if (req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user.role} not authorized!`, 403));
  }

  next();
});




export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);