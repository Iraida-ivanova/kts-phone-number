import * as React from 'react';

import { observer, useLocalStore } from 'mobx-react-lite';

import CountrySelector from 'components/PhoneInput/CountrySelector';
import { blurPhoneInput, focusPhoneInput } from 'shared/utils';
import {
  PhoneInputStore,
  PhoneInputStoreProvider,
} from 'stores/PhoneInputStore';

import s from './PhoneInput.module.scss';
import PhoneNumbers from './PhoneNumbers';
import ValidateResultComponent from './ValidateResultComponent/ValidateResultComponent';

const PhoneInput: React.FC = () => {
  const store = useLocalStore(() => new PhoneInputStore());
  React.useEffect(() => {
    store.initMasks();
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    const phoneNumbers = store.phoneNumbersStore.phoneNumbers;

    const index = (e.target as HTMLFormElement).name;
    if (!index) {
      return;
    }

    if (e.code.includes('Digit')) {
      if (phoneNumbers[+index]) {
        focusPhoneInput({ name: String(+index + 1) });
      }
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusPhoneInput({ name: String(+index - 1) });
    }

    if (e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault();
      focusPhoneInput({ name: String(+index + 1) });
    }

    if (e.key === 'Backspace') {
      if (phoneNumbers[+index]) {
        store.phoneNumbersStore.deleteNumber(+index);
      } else {
        store.phoneNumbersStore.deleteNumber(+index - 1);
        focusPhoneInput({ name: String(+index - 1) });
      }
    }
    if (e.key === 'Enter') {
      store.validate();
      blurPhoneInput({ name: String(+index) });
    }
  }, []);

  if (!store.selectedMask) {
    return null;
  }

  return (
    <PhoneInputStoreProvider value={{ store }}>
      <label htmlFor="phone" className={s['phone-form__label']}>
        Введите номер телефона
      </label>
      <form className={s['phone-form']} name="phone">
        <CountrySelector />
        <PhoneNumbers
          mask={store.selectedMask.mask}
          onKeyDown={handleKeyDown}
        />
      </form>
      {store.validateResult && (
        <ValidateResultComponent result={store.validateResult} />
      )}
    </PhoneInputStoreProvider>
  );
};

export default observer(PhoneInput);
