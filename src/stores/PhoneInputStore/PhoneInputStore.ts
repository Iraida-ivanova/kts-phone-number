import {
  action,
  computed,
  // eslint-disable-next-line import/named
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from 'mobx';

import { ILocalStore } from 'shared/hooks/useLocalStore';
import { ValidateResult } from 'shared/types';
import { CollectionModel } from 'stores/models/collection';
import {
  CountriesPhoneMasksType,
  MaskModel,
  normalizeMask,
} from 'stores/models/mask';
import { PhoneNumbersStore } from 'stores/PhoneNumbersStore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const countries = require('countries-phone-masks');

type PrivateFields = '_selectedKey';

export default class PhoneInputStore implements ILocalStore {
  private _selectedKey: string | undefined = undefined;
  private _masks: CollectionModel<string, MaskModel> = {
    keys: [],
    entities: {},
  };
  readonly phoneNumbersStore: PhoneNumbersStore = new PhoneNumbersStore();

  constructor() {
    makeObservable<PhoneInputStore, PrivateFields>(this, {
      _selectedKey: observable,

      selectedKey: computed,
      selectedMask: computed,
      masks: computed,
      validateResult: computed,
      numbersLength: computed,

      reset: action,
      clearValidateResult: action,
    });
  }

  get selectedKey(): string | undefined {
    return this._selectedKey;
  }

  set selectedKey(key: string | undefined) {
    this._selectedKey = key;
  }

  get selectedMask(): MaskModel | null {
    if (!this._selectedKey) {
      return null;
    }

    return this._masks.entities[this._selectedKey] || null;
  }

  get masks(): MaskModel[] {
    const arr: MaskModel[] = [];
    this._masks.keys.forEach((id: string) => {
      const item = this._masks.entities[id];

      if (item) {
        arr.push(item);
      }
    });

    return arr;
  }

  get validateResult(): ValidateResult | null {
    return this.phoneNumbersStore.validateResult;
  }

  get numbersLength(): number {
    if (!this.selectedMask) {
      return 0;
    }
    return [...this.selectedMask.mask].filter((char) => char === '#').length;
  }

  validate = () => {
    this.phoneNumbersStore.validate();
  };

  clearValidateResult = () => {
    this.phoneNumbersStore.validateResult = null;
  };

  initMasks = () => {
    this._masks = countries.reduce(
      (
        acc: CollectionModel<string, MaskModel>,
        item: CountriesPhoneMasksType
      ) => {
        const maskModel: MaskModel = normalizeMask(item);

        return {
          ...acc,
          entities: {
            ...acc.entities,
            [maskModel.key]: maskModel,
          },
          keys: [...acc.keys, maskModel.key],
        };
      },
      this._masks
    );

    this._selectedKey = 'RU';
  };

  private readonly selectedKeyReaction: IReactionDisposer = reaction(
    () => this._selectedKey,
    () => {
      this.phoneNumbersStore.reset();
      this.phoneNumbersStore.initialize(this.numbersLength);
    }
  );

  reset = () => {
    this._selectedKey = undefined;
    this._masks = {
      keys: [],
      entities: {},
    };
    this.selectedKeyReaction();
  };
}
