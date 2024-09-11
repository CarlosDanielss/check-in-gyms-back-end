import { FastifyInstance, FastifyPluginCallback } from "fastify";

import { routeAdapter } from "../config/route-adapter.js";

import { registerControllerFactory } from "@/presentation/controllers/user/register-factory.js";

export const userRoutes: FastifyPluginCallback = (
  app: FastifyInstance,
  opts,
  done
) => {
  app.post("/", routeAdapter(registerControllerFactory()));

  done();
};
