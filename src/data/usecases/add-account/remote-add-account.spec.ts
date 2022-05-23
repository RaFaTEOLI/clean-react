import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { EmailAlreadyBeingUsedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { mockAddAccount } from '@/domain/test';
import { AddAccountParams } from '@/domain/usecases';
import faker from '@faker-js/faker';
import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy
  };
};

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccount());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccount();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test('Should throw EmailAlreadyBeingUsed if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    };
    const promise = sut.add(mockAddAccount());
    await expect(promise).rejects.toThrow(new EmailAlreadyBeingUsedError());
  });
});
