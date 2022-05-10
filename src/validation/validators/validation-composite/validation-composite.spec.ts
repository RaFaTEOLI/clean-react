import { FieldValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('field');
    fieldValidationSpy.error = new Error('first error');
    const fieldValidationSpy2 = new FieldValidationSpy('field');
    fieldValidationSpy2.error = new Error('second error');
    const sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2]);
    const error = sut.validate('field', 'value');
    expect(error).toBe('first error');
  });
});
