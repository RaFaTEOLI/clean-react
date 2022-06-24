import faker from '@faker-js/faker';
import { Authentication } from '../usecases';

export const mockAccountModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
});
