import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import faker from '@faker-js/faker';
import { HttpPostParams, HttpStatusCode } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResponse = {
  data: faker.datatype.json(),
  status: faker.datatype.number()
};
mockedAxios.post.mockResolvedValue(mockedAxiosResponse);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
});

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({ statusCode: mockedAxiosResponse.status, body: mockedAxiosResponse.data });
  });
});
