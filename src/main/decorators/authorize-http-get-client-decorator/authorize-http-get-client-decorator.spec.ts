import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { mockGetRequest, GetStorageSpy, HttpGetClientSpy } from '@/data/test';
import { HttpGetParams } from '@/data/protocols/http';
import faker from '@faker-js/faker';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy);
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  test('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });
});
