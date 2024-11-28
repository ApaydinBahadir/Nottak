import express from "express";

const note_route = express.Router();

note_route.get("/show/:note_id" /* TODO: ADD FUNCTION*/);
note_route.get("/list" /* TODO: ADD FUNCTION*/);
note_route.post("/create_note" /* TODO: ADD FUNCTION*/);
note_route.post("/delete/:note_route" /* TODO: ADD FUNCTION*/);

/*
TODO:Get List By Tag
TODO:Get List Data Range
TODO:Get List By Title
TODO:Get List By User
*/

export default note_route;
