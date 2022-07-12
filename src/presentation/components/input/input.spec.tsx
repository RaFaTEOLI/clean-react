import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Input from './input';
import Context from '@/presentation/contexts/form/form-context';
import { faker } from '@faker-js/faker';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  );
};

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);
    const input = sut.getByTestId(fieldName) as HTMLInputElement;
    expect(input.readOnly).toBeTruthy();
  });

  test('should remove readOnly on focus', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);
    const input = sut.getByTestId(fieldName) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBeFalsy();
  });

  test('should focus input on label click', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);
    const input = sut.getByTestId(fieldName);
    const label = sut.getByTestId(`${fieldName}-label`);
    fireEvent.click(label);
    expect(document.activeElement).toBe(input);
  });
});
