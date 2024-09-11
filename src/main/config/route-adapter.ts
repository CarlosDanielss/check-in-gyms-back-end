import { FastifyReply, FastifyRequest } from "fastify";

import { Controller } from "@/presentation/protocols/controller.js";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http.js";

export function routeAdapter<Q, K>(controller: Controller<Q, K>) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const httpRequest: HttpRequest<Q> = {
      body: req.body as Q,
      params: req.params as Record<string, string>,
      query: req.query as Record<string, string | string[]>,
      cookies: req.cookies as Record<string, string>,
      headers: req.headers as Record<string, string>,
    };

    const httpResponse: HttpResponse<K> = await controller.handle(httpRequest);

    if (httpResponse.cookies) {
      for (const [name, value] of Object.entries(httpResponse.cookies)) {
        res.setCookie(name, value, {
          path: "/",
          sameSite: true,
          httpOnly: true,
          secure: true,
        });
      }
    }

    res.status(httpResponse.statusCode).send(httpResponse.body);
  };
}
