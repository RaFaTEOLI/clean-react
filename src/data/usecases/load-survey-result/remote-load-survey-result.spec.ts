import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy
  };
};

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.show();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
