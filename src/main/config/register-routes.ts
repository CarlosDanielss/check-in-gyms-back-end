import { FastifyInstance } from "fastify";

import { userRoutes } from "../routes/user-routes.js";
import { gymsRoutes } from "../routes/gym-routes.js";

export async function registerRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/user" });
  app.register(gymsRoutes, { prefix: "/gym" });
}
