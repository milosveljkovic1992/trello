import { render, act } from 'utils/test-utils';

import { ErrorSnackbar } from './error-snackbar';

describe('ErrorSnackbar component', () => {
  it('renders notification', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<ErrorSnackbar />);

    const errorContainer = getByTestId('error-snackbar');
    expect(errorContainer).toHaveStyle({ opacity: 1 });
  });

  it('hides notification after time interval', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<ErrorSnackbar />);

    const errorContainer = getByTestId('error-snackbar');
    expect(errorContainer).toHaveStyle({ opacity: 1 });

    act(() => {
      jest.runAllTimers();
    });

    expect(errorContainer).toHaveStyle({ opacity: 0 });
  });
});
