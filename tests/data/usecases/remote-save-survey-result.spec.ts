import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/tests/data/mocks';
import { RemoteSaveSurveyResult } from '@/data/usecases';
import { HttpStatusCode } from '@/data/protocols/http';
import { mockSaveSurveyResultParams } from '@/tests/domain/mocks';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  return {
    sut,
    httpClientSpy
  };
};

describe('RemoteSaveSurveyResult', () => {
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: mockRemoteSurveyResultModel()
    };
    const saveSurveyResultParams = mockSaveSurveyResultParams();
    await sut.save(saveSurveyResultParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams);
  });

  test('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return a SurveyResult on 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyResultModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult
    };
    const httpResponse = await sut.save(mockSaveSurveyResultParams());
    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    });
  });
});
