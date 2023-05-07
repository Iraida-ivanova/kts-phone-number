import React from 'react';

import PhoneInput from 'components/PhoneInput';

import s from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <div className={s.container}>
      <PhoneInput />
    </div>
  );
};

export default MainPage;
