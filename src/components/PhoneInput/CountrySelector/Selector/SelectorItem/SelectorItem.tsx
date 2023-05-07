import * as React from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { MaskModel } from 'stores/models/mask';
import { usePhoneInputStore } from 'stores/PhoneInputStore';

import s from './SelectorItem.module.scss';

type Props = {
  item: MaskModel;
};

const SelectorItem: React.FC<Props> = ({ item }) => {
  const store = usePhoneInputStore();

  const handleClick = React.useCallback(() => {
    store.selectedKey = item.key;
  }, [item.key]);

  return (
    <div
      className={cn(s.item, store.selectedKey === item.key && s.item_selected)}
      onClick={handleClick}
    >
      <div>{item.emoji}</div>
      <div className={s.item__prefix}>{item.prefix}</div>
      <div className={s.item__name}>{item.name}</div>
    </div>
  );
};

export default observer(SelectorItem);
