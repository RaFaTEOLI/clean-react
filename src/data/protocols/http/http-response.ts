export enum HttpStatusCode {
  success = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
};
