import express from "express";
import { create_user, find_user_by_id } from "../controllers/user_controller";

const user_route = express.Router();

user_route.get("/show/:user_id", find_user_by_id);
user_route.get("/show" /* TODO: ADD FUNCTION*/);
user_route.post("/create", create_user);
user_route.post("/delete/:user_id" /* TODO: ADD FUNCTION*/);

export default user_route;
