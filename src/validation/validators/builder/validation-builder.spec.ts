import { ValidationBuilder as sut } from './validation-builder';
import { RequiredFieldValidation, EmailValidation } from '@/validation/validators';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('field')]);
  });

  test('should return EmailValidation', () => {
    const validations = sut.field('field').email().build();
    expect(validations).toEqual([new EmailValidation('field')]);
  });
});
