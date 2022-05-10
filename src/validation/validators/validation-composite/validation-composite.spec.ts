import { FieldValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy('field'), new FieldValidationSpy('field')];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy
  };
};

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut();
    fieldValidationsSpy[0].error = new Error('first error');
    fieldValidationsSpy[1].error = new Error('second error');
    const error = sut.validate('field', 'value');
    expect(error).toBe('first error');
  });

  test('should return false if no validation fails', () => {
    const { sut } = makeSut();
    const error = sut.validate('field', 'value');
    expect(error).toBeFalsy();
  });
});
