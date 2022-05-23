import { InvalidFieldError } from '@/validation/errors';
import { CompareFieldsValidation } from './compare-fields-validation';
import faker from '@faker-js/faker';

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe('CompareFieldsValidation', () => {
  test('should return error if comparison does not match', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return false if comparison is valid', () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
