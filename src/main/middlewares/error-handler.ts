import { FastifyReply, FastifyRequest } from "fastify";

import { env } from "../config/env.js";

interface ErrorHandler extends Error {
  statusCode?: number;
}

export async function errorHandler(
  error: ErrorHandler,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply.status(500).send("Internal Server Error");
}
