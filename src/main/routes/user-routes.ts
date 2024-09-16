import { FastifyInstance, FastifyPluginCallback } from "fastify";

import { routeAdapter } from "../config/route-adapter.js";

import { registerControllerFactory } from "@/presentation/controllers/user/register-factory.js";
import { updateControllerFactory } from "@/presentation/controllers/user/update-factory.js";
import { ProfileRecoveryControllerFactory } from "@/presentation/controllers/user/profile-recovery-factory.js";
import { AuthenticateControllerFactory } from "@/presentation/controllers/user/authenticate-factory.js";

export const userRoutes: FastifyPluginCallback = (
  app: FastifyInstance,
  opts,
  done
) => {
  app.post("/", routeAdapter(registerControllerFactory()));
  app.patch("/:id", routeAdapter(updateControllerFactory()));
  app.get("/:id", routeAdapter(ProfileRecoveryControllerFactory()));
  app.post("/auth", routeAdapter(AuthenticateControllerFactory()));

  done();
};
