import { HttpRequest, HttpResponse } from "./http.js";

export interface Controller<Q, K> {
  handle(HttpRequest: HttpRequest<Q>): Promise<HttpResponse<K>>;
}
