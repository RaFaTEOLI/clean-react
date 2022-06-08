/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode
} from '../protocols/http';
import faker from '@faker-js/faker';

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
});

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
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

export class HttpGetClientSpy implements HttpGetClient {
  url: string;

  // eslint-disable-next-line @typescript-eslint/require-await
  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url;
  }
}
