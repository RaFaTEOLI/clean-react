import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return !value ||
      String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ? null
      : new InvalidFieldError();
  }
}
