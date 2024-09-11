export interface HttpRequest<T> {
  body: T;
  params?: Record<string, string>;
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface HttpResponse<T> {
  statusCode: number;
  body: T;
  cookies?: Record<string, string>;
}
