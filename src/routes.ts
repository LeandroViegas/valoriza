import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserControlller = new CreateUserController();
const createTagControlller = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post("/tags", ensureAdmin, createTagControlller.handle);
router.post("/users", createUserControlller.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", createComplimentController.handle);

export { router };
