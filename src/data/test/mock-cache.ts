/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStorage } from '../protocols/cache';
import faker from '@faker-js/faker';

export class GetStorageSpy implements GetStorage {
  key: string;
  value = faker.random.objectElement();

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
