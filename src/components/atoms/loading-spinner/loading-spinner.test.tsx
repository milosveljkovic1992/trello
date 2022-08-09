import { render } from 'utils/test-utils';
import { LoadingSpinner } from './loading-spinner';

describe('LoadingSpinner', () => {
  it('renders component', () => {
    const { getByTestId } = render(<LoadingSpinner />);

    const loadingSpinnerContainer = getByTestId('loading-spinner');
    expect(loadingSpinnerContainer).toBeInTheDocument();
  });
});
