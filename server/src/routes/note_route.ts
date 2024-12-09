import express from "express";
import {
  create_note,
  delete_by_id,
  list_by_user_id,
  show_by_id,
  update_note,
} from "../controllers/note_controller";

const note_route = express.Router();

note_route.get("/show", show_by_id);
note_route.get("/list", list_by_user_id);
note_route.post("/create", create_note);
note_route.post("/delete", delete_by_id);
note_route.post("/update", update_note);

export default note_route;
