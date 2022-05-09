import { RequiredFieldError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';
import faker from '@faker-js/faker';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  test('should return false if not is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});
