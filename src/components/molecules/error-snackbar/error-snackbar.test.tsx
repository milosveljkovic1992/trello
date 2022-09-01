import { render, act, screen, cleanup } from 'utils/test-utils';
import { createPortal } from 'react-dom';

import store from 'store';
import { throwError } from 'store/error-slice';

import App from 'App';
import { ErrorSnackbar } from './error-snackbar';

afterAll(cleanup);

let errorRootElement = document.getElementById('error-root');
if (!errorRootElement) {
  errorRootElement = document.createElement('div');
  errorRootElement.setAttribute('id', 'error-root');
  document.body.appendChild(errorRootElement);

  createPortal(<ErrorSnackbar />, errorRootElement);
}

describe('ErrorSnackbar component', () => {
  it('renders notification', () => {
    jest.useFakeTimers();
    const errorMessage = 'test error message';

    render(<App />);

    const initialState = store.getState();

    expect(screen.queryByTestId('error-snackbar')).not.toBeInTheDocument();
    expect(initialState.errorHandler.errorMessage).toBe('');

    act(() => {
      store.dispatch(throwError(errorMessage));
    });

    const stateAfterDispatch = store.getState();
    const errorContainer = screen.getByTestId('error-snackbar');

    expect(errorContainer).toHaveStyle({ opacity: 1 });
    expect(screen.queryByText(errorMessage)).toBeInTheDocument();
    expect(stateAfterDispatch.errorHandler.errorMessage).not.toBe('');
    expect(stateAfterDispatch.errorHandler.errorMessage).toBe(errorMessage);

    act(() => {
      jest.runAllTimers();
    });

    const stateAfterTimeout = store.getState();
    const errorContainerAfterTimeout = screen.queryByTestId('error-snackbar');

    expect(errorContainerAfterTimeout).not.toBeInTheDocument();
    expect(stateAfterTimeout.errorHandler.errorMessage).not.toBe(errorMessage);
    expect(stateAfterTimeout.errorHandler.errorMessage).toBe('');
  });
});
