import fastify from "fastify";

import { errorHandler } from "../middlewares/error-handler.js";
import { setupMiddlewares } from "./setup-middlewares.js";
import { registerRoutes } from "./register-routes.js";

export const app = fastify();

app.setErrorHandler(errorHandler);

setupMiddlewares(app);

registerRoutes(app);
