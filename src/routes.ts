import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserControlller = new CreateUserController();
const createTagControlller = new CreateTagController();

router.post("/tags", ensureAdmin, createTagControlller.handle);
router.post("/users", createUserControlller.handle);

export { router };
