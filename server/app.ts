import express, { Request, Response, json } from "express";
import note_route from "./routes/note_route";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is backend server for nottak app");
});

app.use(json());

app.use("/api/notes", note_route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
