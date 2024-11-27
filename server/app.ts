import express, { Request, Response, json } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Worldie");
});

app.use(json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
