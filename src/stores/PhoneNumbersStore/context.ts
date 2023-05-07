import * as React from 'react';

import PhoneNumbersStore from './PhoneNumbersStore';

const PhoneNumbersStoreContext = React.createContext<{
  store: PhoneNumbersStore | null;
}>({
  store: null,
});

const PhoneNumbersStoreProvider = PhoneNumbersStoreContext.Provider;

const usePhoneNumbersStore = (): PhoneNumbersStore => {
  const PhoneNumbersStoreContextCtx = React.useContext(
    PhoneNumbersStoreContext
  );

  return PhoneNumbersStoreContextCtx.store as PhoneNumbersStore;
};

export { PhoneNumbersStore, PhoneNumbersStoreProvider, usePhoneNumbersStore };
