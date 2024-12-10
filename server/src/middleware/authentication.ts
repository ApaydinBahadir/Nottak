import { Request, Response, NextFunction } from "express";

// Middleware to check authentication
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.session:", req.session);

  if (req.session?.user) {
    next(); // User is logged in
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized: Please log in to access this resource" });
  }
};