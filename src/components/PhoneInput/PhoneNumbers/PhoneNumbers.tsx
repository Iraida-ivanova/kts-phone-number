import React from 'react';

import { observer } from 'mobx-react-lite';

import {} from 'stores/PhoneNumbersStore';

import s from './PhoneNumbers.module.scss';
import NumberInput from '../NumberInput/NumberInput';

type Props = {
  mask: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
};

const PhoneNumbers: React.FC<Props> = ({ mask, onKeyDown, disabled }) => {
  let number = 0;

  return (
    <div className={s.numbers} onKeyDown={onKeyDown}>
      {[...mask].map((symbol, idx) => {
        if (symbol === '(') {
          return <div key={idx}>(</div>;
        }
        if (symbol === ')') {
          return <div key={idx}>)</div>;
        }
        if (symbol === '-') {
          return <div key={idx}>-</div>;
        }
        const index = number;
        number++;
        return <NumberInput index={index} key={idx} disabled={disabled} />;
      })}
    </div>
  );
};

export default observer(PhoneNumbers);
