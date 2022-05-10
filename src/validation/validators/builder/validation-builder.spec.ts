import { ValidationBuilder as sut } from './validation-builder';
import { RequiredFieldValidation } from '@/validation/validators';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('field')]);
  });
});
