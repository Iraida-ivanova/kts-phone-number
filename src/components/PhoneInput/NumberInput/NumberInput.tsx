import * as React from 'react';

import { observer } from 'mobx-react-lite';

import Input from 'components/Input';
import { usePhoneInputStore } from 'stores/PhoneInputStore';

import s from './NumberInput.module.scss';

type Props = {
  index: number;
};

const NumberInput: React.FC<Props> = ({ index }) => {
  const store = usePhoneInputStore();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        !e.target.value || Number.isNaN(+e.target.value) === true
          ? null
          : +e.target.value;
      store.phoneNumbersStore.setNumberValue(index, value);
    },
    [index]
  );

  const handleFocus = React.useCallback(() => {
    if (store.validateResult) {
      store.clearValidateResult();
    }
  }, [store.validateResult]);

  return (
    <Input
      inputMode="tel"
      maxLength={1}
      className={s['number-input']}
      placeholder={String((index + 1) % 10)}
      onChange={handleChange}
      value={store.phoneNumbersStore.phoneNumbers[index] ?? ''}
      name={String(index)}
      autoComplete="off"
      validateResult={store.validateResult}
      onFocus={handleFocus}
    />
  );
};

export default observer(NumberInput);
