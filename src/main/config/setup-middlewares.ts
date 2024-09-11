import { FastifyInstance } from "fastify";

import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";

export async function setupMiddlewares(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: "https://www.google.com",
  });

  app.register(fastifyCookie);
}
