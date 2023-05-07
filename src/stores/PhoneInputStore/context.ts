import * as React from 'react';

import PhoneInputStore from './PhoneInputStore';

const PhoneInputStoreContext = React.createContext<{
  store: PhoneInputStore | null;
}>({
  store: null,
});

const PhoneInputStoreProvider = PhoneInputStoreContext.Provider;

const usePhoneInputStore = (): PhoneInputStore => {
  const PhoneInputStoreContextCtx = React.useContext(PhoneInputStoreContext);

  return PhoneInputStoreContextCtx.store as PhoneInputStore;
};

export { PhoneInputStore, PhoneInputStoreProvider, usePhoneInputStore };
