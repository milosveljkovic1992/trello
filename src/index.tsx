import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './store';

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('mocks/browser');
  worker.start();
}

const rootElement = document.getElementById('root');

const root = rootElement && createRoot(rootElement);

if (root) {
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
}
