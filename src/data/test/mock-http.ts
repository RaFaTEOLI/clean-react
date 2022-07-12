/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http';
import { faker } from '@faker-js/faker';

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.datatype.json()
});

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.success
  };

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.success
  };

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}
