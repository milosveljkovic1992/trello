import { render } from 'utils/test-utils';
import { LogoutButton } from './logout-button';

describe('LogoutButton', () => {
  it('renders component', () => {
    const { getByText } = render(<LogoutButton fixed={true} />);

    const logoutButtonElement = getByText('Log Out');
    expect(logoutButtonElement).toBeInTheDocument();
  });
});
