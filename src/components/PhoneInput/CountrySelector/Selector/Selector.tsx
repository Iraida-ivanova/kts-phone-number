import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { usePhoneInputStore } from 'stores/PhoneInputStore';

import s from './Selector.module.scss';
import SelectorItem from './SelectorItem';

const Selector: React.FC = () => {
  const store = usePhoneInputStore();

  return (
    <div className={s.selector}>
      {store.masks.map((mask) => {
        return <SelectorItem key={mask.key} item={mask} />;
      })}
    </div>
  );
};

export default observer(Selector);
