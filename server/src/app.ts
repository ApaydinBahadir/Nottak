import express, { Request, Response, json } from "express";
import note_route from "./routes/note_route";
import user_route from "./routes/user_route";
import cors from "cors";

const app = express();
const port = 3000;
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(json());
app.use("/api/notes", note_route);
app.use("/api/user", user_route);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is backend server for nottak app");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
