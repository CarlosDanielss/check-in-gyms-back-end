import { FastifyInstance, FastifyPluginCallback } from "fastify";

import { routeAdapter } from "../config/route-adapter.js";

import { CreateControllerFactory } from "@/presentation/controllers/gym/create-factory.js";
import { NearbyGymControllerFactory } from "@/presentation/controllers/gym/nearby-gym-factory.js";
import { SearchControllerFactory } from "@/presentation/controllers/gym/search-factory.js";

export const gymsRoutes: FastifyPluginCallback = (
  app: FastifyInstance,
  opts,
  done
) => {
  app.post("/", routeAdapter(CreateControllerFactory()));
  app.post("/nearby", routeAdapter(NearbyGymControllerFactory()));
  app.post("/search", routeAdapter(SearchControllerFactory()));

  done();
};
