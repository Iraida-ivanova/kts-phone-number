import * as React from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import DownIcon from 'components/icons/DownIcon/DownIcon';
import { usePhoneInputStore } from 'stores/PhoneInputStore';

import s from './CountrySelector.module.scss';
import Selector from './Selector/Selector';

const CountrySelector: React.FC = () => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const store = usePhoneInputStore();

  React.useEffect(() => {
    const handleDocumentClick = (e: Event) => {
      const target = e.target as HTMLElement;

      if (opened && !target?.closest('#selector')) {
        setOpened(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [opened]);

  const handleIconClick = React.useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  if (!store.selectedMask) {
    return null;
  }

  return (
    <div className={s['country-selector']} id="selector">
      <div
        className={cn(
          s.input,
          store.validateResult && s[`input_${store.validateResult}`],
          s['country-selector__input']
        )}
      >
        <span className={s['country-selector__input-flag']}>
          {store.selectedMask?.emoji}
        </span>
        <span>{store.selectedMask?.prefix}</span>
        <DownIcon
          className={s['country-selector__input-icon']}
          onClick={handleIconClick}
        />
      </div>
      {opened && <Selector />}
    </div>
  );
};

export default observer(CountrySelector);
