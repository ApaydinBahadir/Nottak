import express from "express";

const user_route = express.Router();

user_route.get("/show/:user_id" /* TODO: ADD FUNCTION*/);
user_route.get("/show" /* TODO: ADD FUNCTION*/);
user_route.post("/create" /* TODO: ADD FUNCTION*/);
user_route.post("/delete/:user_id" /* TODO: ADD FUNCTION*/);

export default user_route;
