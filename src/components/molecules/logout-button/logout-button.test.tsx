import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { LogoutButton } from './logout-button';

describe('LogoutButton', () => {
  it('renders component', () => {
    const handleLogoutButton = jest.fn();
    const { getByRole } = render(
      <LogoutButton isHomePage={true} handleClick={handleLogoutButton} />,
    );

    const logoutButton = getByRole('button', { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);
    expect(handleLogoutButton).toBeCalled();
    expect(handleLogoutButton).toBeCalledTimes(1);
  });
});
