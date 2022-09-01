import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { ImHome } from 'react-icons/im';

import { HomeButton } from './home-button';

describe('HomeButton', () => {
  it('renders button and executes the handle function on click', () => {
    const handleHomeButton = jest.fn();
    const { getByRole } = render(
      <HomeButton handleClick={handleHomeButton} icon={<ImHome />} />,
    );

    const homeButtonElement = getByRole('home-button');
    expect(homeButtonElement).toBeInTheDocument();

    userEvent.click(homeButtonElement);
    expect(handleHomeButton).toBeCalled();
    expect(handleHomeButton).toBeCalledTimes(1);
  });
});
