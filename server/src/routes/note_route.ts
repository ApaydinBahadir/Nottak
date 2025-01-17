import express from "express";
import {
  create_note,
  delete_by_id,
  list_by_user_id,
  show_by_id,
  update_note,
} from "../controllers/note_controller";
import { isAuthenticated } from "../middleware/authentication";

const note_route = express.Router();

//All of them is authenticated

note_route.get("/show", isAuthenticated, show_by_id);
note_route.post("/list", isAuthenticated, list_by_user_id);
note_route.post("/create", isAuthenticated, create_note);
note_route.post("/delete", isAuthenticated, delete_by_id);
note_route.post("/update", isAuthenticated, update_note);

export default note_route;
