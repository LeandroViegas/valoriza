import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersControlller } from "./controllers/ListUsersController";
import { ListUserSendComplimentController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserControlller = new CreateUserController();
const createTagControlller = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentController =
  new ListUserReceiveComplimentController();
const listUserSendComplimentController = new ListUserSendComplimentController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersControlller();

router.post("/login", authenticateUserController.handle);

router.post("/users", createUserControlller.handle);

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagControlller.handle
);

router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentController.handle
);
router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentController.handle
);

router.get("/tags", listTagsController.handle);

router.get("/users",ensureAuthenticated, listUsersController.handle);

export { router };
