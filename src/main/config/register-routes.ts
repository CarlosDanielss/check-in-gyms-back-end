import { FastifyInstance } from "fastify";

import { userRoutes } from "../routes/user-routes.js";

export async function registerRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/user" });
}
