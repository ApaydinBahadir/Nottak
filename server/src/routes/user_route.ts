import express from "express";
import {
  create_user,
  delete_by_user_id,
  find_user_by_id,
  login_user,
} from "../controllers/user_controller";

const user_route = express.Router();

user_route.get("/show", find_user_by_id);
user_route.post("/create", create_user);
user_route.get("/delete", delete_by_user_id);
user_route.post("/login", login_user);

export default user_route;
