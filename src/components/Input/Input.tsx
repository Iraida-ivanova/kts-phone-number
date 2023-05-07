import * as React from 'react';

import cn from 'classnames';

import { ValidateResult } from 'shared/types';

import s from './Input.module.scss';

type Props = {
  className?: string;
  placeholder?: string;
  validateResult: ValidateResult | null;
} & Omit<React.HTMLProps<HTMLInputElement>, 'placeholder'>;

const Input: React.FC<Props> = ({
  className,
  placeholder,
  validateResult,
  ...rest
}: Props) => {
  return (
    <>
      <input
        className={cn(
          s.input,
          validateResult && s[`input_${validateResult}`],
          className
        )}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
};

export default React.memo(Input);
