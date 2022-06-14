import { LocalStorageAdapter } from './local-storage-adapter';
import faker from '@faker-js/faker';
import 'jest-localstorage-mock';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should call localStorage with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = JSON.parse(faker.datatype.json());
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });
});
