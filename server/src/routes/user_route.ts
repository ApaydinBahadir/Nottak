import express from "express";
import {
  auth_check,
  change_password,
  create_user,
  delete_by_user_id,
  find_user_by_id,
  login_user,
  logout,
} from "../controllers/user_controller";
import { isAuthenticated } from "../middleware/authentication";

const user_route = express.Router();

user_route.get("/show", isAuthenticated, find_user_by_id);
user_route.post("/register", create_user);
user_route.get("/delete", isAuthenticated, delete_by_user_id);
user_route.post("/login", login_user);
user_route.get("/auth/check", auth_check);
user_route.post("/logout", logout);
user_route.post("/change_password", isAuthenticated, change_password);

export default user_route;
