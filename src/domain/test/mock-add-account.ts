import faker from '@faker-js/faker';
import { AddAccountParams } from '../usecases/add-account';

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  };
};