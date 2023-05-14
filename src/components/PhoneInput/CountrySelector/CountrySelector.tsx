import * as React from 'react';

import { observer } from 'mobx-react-lite';

import DownIcon from 'components/icons/DownIcon/DownIcon';
import InputElement from 'components/InputElement';
import { usePhoneInputStore } from 'stores/PhoneInputStore';

import s from './CountrySelector.module.scss';
import Selector from './Selector';

type Props = {
  disabled?: boolean;
};

const CountrySelector: React.FC<Props> = ({ disabled }) => {
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
    if (!disabled) {
      setOpened((prev) => !prev);
    }
  }, [disabled]);

  if (!store.selectedMask) {
    return null;
  }

  return (
    <div className={s['country-selector']} id="selector">
      <InputElement
        type="div"
        validateResult={store.validateResult}
        className={s['country-selector__input']}
        disabled={disabled}
      >
        <>
          <span className={s['country-selector__input-flag']}>
            {store.selectedMask?.emoji}
          </span>
          <span>{store.selectedMask?.prefix}</span>
          <DownIcon
            className={s['country-selector__input-icon']}
            onClick={handleIconClick}
          />
        </>
      </InputElement>
      {opened && <Selector />}
    </div>
  );
};

export default observer(CountrySelector);
