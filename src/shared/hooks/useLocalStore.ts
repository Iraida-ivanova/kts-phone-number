import React from 'react';

export interface ILocalStore {
  reset(): void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => container.current?.reset();
  }, []);
  return container.current;
};
