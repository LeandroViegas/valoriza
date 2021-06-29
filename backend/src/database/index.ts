import { createConnection } from "typeorm";
import { Tag } from "../entities/Tag";
import { Compliment } from "../entities/Compliment";
import { User } from "../entities/User";
import { CreateUsers1624330740676 } from "./migrations/1624330740676-CreateUsers";
import { CreateTags1624485228965 } from "./migrations/1624485228965-CreateTags";
import { AlterUserAddPassword1624590690358 } from "./migrations/1624590690358-AlterUserAddPassword";
import { CreateCompliments1624596017077 } from "./migrations/1624596017077-CreateCompliments";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

createConnection({
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  migrations: [
      CreateUsers1624330740676,
      CreateTags1624485228965,
      AlterUserAddPassword1624590690358,
      CreateCompliments1624596017077],
  entities: [Tag, Compliment, User],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/entities",
  }
});
