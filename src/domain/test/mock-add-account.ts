import faker from '@faker-js/faker';
import { AddAccount } from '../usecases/add-account';
import { mockAccountModel } from './mock-account';

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  };
};

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel();

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel();
  params: AddAccount.Params;
  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
