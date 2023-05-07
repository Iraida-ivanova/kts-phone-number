import React from 'react';

import ErrorIcon from 'components/icons/ErrorIcon/ErrorIcon';
import SuccessIcon from 'components/icons/SuccessIcon/SuccessIcon';
import { ValidateResult } from 'shared/types';

import s from './ValidateResultComponent.module.scss';

type Props = {
  result: ValidateResult;
};

const ValidateResultComponent: React.FC<Props> = ({ result }: Props) => {
  return (
    <div className={s.validate}>
      {result === ValidateResult.success && (
        <>
          <SuccessIcon className={s.validate__icon} />
          Номер телефона введен верно
        </>
      )}
      {result === ValidateResult.error && (
        <>
          <ErrorIcon className={s.validate__icon} />
          Неправильный номер телефона
        </>
      )}
    </div>
  );
};

export default React.memo(ValidateResultComponent);
