import tracer, { setTag } from './tracer';

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
setTag("express", "tag-value");
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  setTag("toli", "tag-value");
  res.send("Hello World");
});

app.listen(port, () => {
    setTag("server", "tag-value");
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
