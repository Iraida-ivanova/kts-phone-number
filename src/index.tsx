import * as React from 'react';

import { createRoot } from 'react-dom/client';

import App from 'App/App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

if (module.hot) {
  module.hot.accept();
}