import * as React from 'react';

import { observer } from 'mobx-react-lite';

import InputElement from 'components/InputElement';
import { focusPhoneInput } from 'shared/utils';
import { usePhoneInputStore } from 'stores/PhoneInputStore';

import s from './NumberInput.module.scss';

type Props = {
  index: number;
  disabled?: boolean;
};

const NumberInput: React.FC<Props> = ({ index, disabled }) => {
  const store = usePhoneInputStore();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        !e.target.value || Number.isNaN(+e.target.value) === true
          ? null
          : +e.target.value;
      store.phoneNumbersStore.setNumberValue(index, value);
      focusPhoneInput({ name: String(+index + 1) });
    },
    [index]
  );

  const handleFocus = React.useCallback(() => {
    if (store.validateResult) {
      store.clearValidateResult();
    }
  }, [store.validateResult]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (
      store.phoneNumbersStore.isFilledNumber(+index) &&
      e.code.includes('Digit')
    ) {
      store.phoneNumbersStore.deleteNumber(index);
    }
  }, []);

  return (
    <InputElement
      validateResult={store.validateResult}
      className={s['number-input']}
      type="input"
      inputMode="tel"
      maxLength={1}
      placeholder={String((index + 1) % 10)}
      onChange={handleChange}
      value={store.phoneNumbersStore.phoneNumbers[index] ?? ''}
      name={String(index)}
      autoComplete="off"
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      required
    />
  );
};

export default observer(NumberInput);
