import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Theme from 'global/Theme';
import store from 'store';
import { DragDropContext } from 'react-beautiful-dnd';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Theme>{children}</Theme>
      </Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export const providerWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Theme>
          <DragDropContext onDragEnd={jest.fn()}>{children}</DragDropContext>
        </Theme>
      </Provider>
    </BrowserRouter>
  );
};

export * from '@testing-library/react';
export { customRender as render };
