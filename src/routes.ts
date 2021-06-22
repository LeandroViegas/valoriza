import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserControlller = new CreateUserController

router.post("/users", createUserControlller.handle);

export { router };
