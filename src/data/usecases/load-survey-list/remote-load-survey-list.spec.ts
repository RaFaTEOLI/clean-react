import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import faker from '@faker-js/faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { mockSurveyListModel } from '@/domain/test';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.all();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    };
    const promise = sut.all();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.all();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.all();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return a list of SurveyModels if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult
    };
    const surveyList = await sut.all();
    expect(surveyList).toEqual(httpResult);
  });

  test('should return an empty list of LoadSurveyList.Model if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    };
    const surveyList = await sut.all();
    expect(surveyList).toEqual([]);
  });
});
