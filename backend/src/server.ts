import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";

import { router } from "./routes";

import "./database";

const app = express();

app.use(
  cors({
    origin: [
      "https://valoriza.vercel.app",
      "http://localhost:3000"
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3333, () => {console.log("server is running"); console.log(__filename);});
