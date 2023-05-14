import { action, computed, makeObservable, observable } from 'mobx';

import { ILocalStore } from 'shared/hooks/useLocalStore';
import { ValidateResult } from 'shared/types';
type PrivateFields = '_phoneNumbers' | '_validateResult';

export default class PhoneNumbersStore implements ILocalStore {
  private _phoneNumbers: Array<number | null> = [];
  private _validateResult: ValidateResult | null = null;

  constructor() {
    makeObservable<PhoneNumbersStore, PrivateFields>(this, {
      _phoneNumbers: observable,
      _validateResult: observable,

      phoneNumbers: computed,
      validateResult: computed,

      validate: action,
      setNumberValue: action,
      initialize: action,
      reset: action,
      deleteNumber: action,
      clearValidateResult: action,
    });
  }

  get phoneNumbers(): Array<number | null> {
    return this._phoneNumbers;
  }

  get validateResult(): ValidateResult | null {
    return this._validateResult;
  }

  setNumberValue = (index: number, value: number | null): void => {
    this._phoneNumbers[index] = value;
  };

  deleteNumber = (index: number) => {
    this._phoneNumbers[index] = null;
  };

  isFilledNumber = (index: number) => {
    return typeof this._phoneNumbers[index] === 'number';
  };

  validate = (): void => {
    this._validateResult = this._phoneNumbers.includes(null)
      ? ValidateResult.error
      : ValidateResult.success;
  };

  clearValidateResult = () => {
    this._validateResult = null;
  };

  initialize = (length: number) => {
    this._phoneNumbers.length = length;
    this._phoneNumbers.fill(null);
  };

  reset(): void {
    this._phoneNumbers = [];
    this._validateResult = null;
  }
}
