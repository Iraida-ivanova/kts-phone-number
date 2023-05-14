import * as React from 'react';

import cn from 'classnames';

import { ValidateResult } from 'shared/types';

import s from './InputElement.module.scss';

type Props = {
  className?: string;
  validateResult: ValidateResult | null;
} & (
  | { type: 'div'; children: React.ReactNode; disabled?: boolean }
  | ({ type: 'input' } & React.HTMLProps<HTMLInputElement>)
);

const InputElement: React.FC<Props> = ({
  className,
  validateResult,
  type,
  ...rest
}: Props) => {
  const styleName = cn(
    s.input,
    validateResult && s[`input_${validateResult}`],
    rest.disabled && s.input_disabled,
    className
  );
  return (
    <>
      {type === 'input' && <input className={styleName} {...rest} />}
      {type === 'div' && <div className={styleName}>{rest.children}</div>}
    </>
  );
};

export default React.memo(InputElement);
