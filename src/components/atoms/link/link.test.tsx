import { render } from 'utils/test-utils';
import { Link } from './link';

describe('Link component', () => {
  it('renders a link', () => {
    const { getByText } = render(<Link to="#">Click me</Link>);

    const LinkElement = getByText('Click me', { exact: false });
    expect(LinkElement).toBeInTheDocument();
  });
});
