import { render } from 'utils/test-utils';
import { LoadingBars } from './loading-bars';

describe('LoadingBars', () => {
  it('renders component', () => {
    const { getByTestId } = render(<LoadingBars />);

    const loadingContainer = getByTestId('loading-bars');
    expect(loadingContainer).toBeInTheDocument();
  });
});
