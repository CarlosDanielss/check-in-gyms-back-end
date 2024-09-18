import { FastifyInstance, FastifyPluginCallback } from "fastify";

import { routeAdapter } from "../config/route-adapter.js";
import { CreateControllerFactory } from "@/presentation/controllers/gym/create-factory.js";

export const gymsRoutes: FastifyPluginCallback = (
  app: FastifyInstance,
  opts,
  done
) => {
  app.post("/", routeAdapter(CreateControllerFactory()));

  done();
};
