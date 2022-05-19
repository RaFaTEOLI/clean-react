import { SetStorageMock } from '@/data/test/mock-storage';
import { LocalSaveAccessToken } from './local-save-access-token';
import faker from '@faker-js/faker';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  test('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const accessToken = faker.datatype.uuid();
    const promise = sut.save(accessToken);
    await expect(promise).rejects.toThrow(new Error());
  });
});
