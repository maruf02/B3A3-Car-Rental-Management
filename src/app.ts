import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
const port = 3000;

//parser
app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  var a = 10;
  res.send("Hello World!");
});

export default app;
