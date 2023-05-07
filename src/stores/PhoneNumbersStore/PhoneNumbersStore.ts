import { action, computed, makeObservable, observable } from 'mobx';

import { ILocalStore } from 'shared/hooks/useLocalStore';
import { ValidateResult } from 'shared/types';
type PrivateFields = '_phoneNumbers';

export default class PhoneNumbersStore implements ILocalStore {
  private _phoneNumbers: Array<number | null> = [];
  validateResult: ValidateResult | null = null;

  constructor() {
    makeObservable<PhoneNumbersStore, PrivateFields>(this, {
      _phoneNumbers: observable,
      validateResult: observable,

      phoneNumbers: computed,

      validate: action,
      setNumberValue: action,
      initialize: action,
      reset: action,
    });
  }

  get phoneNumbers(): Array<number | null> {
    return this._phoneNumbers;
  }

  setNumberValue = (index: number, value: number | null): void => {
    this._phoneNumbers[index] = value;
  };

  deleteNumber = (index: number) => {
    this._phoneNumbers[index] = null;
  };

  validate = (): void => {
    this.validateResult = this._phoneNumbers.includes(null)
      ? ValidateResult.error
      : ValidateResult.success;
  };

  initialize = (length: number) => {
    this._phoneNumbers.length = length;
    this._phoneNumbers.fill(null);
  };

  reset(): void {
    this._phoneNumbers = [];
    this.validateResult = null;
  }
}
