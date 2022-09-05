import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { ImHome } from 'react-icons/im';

import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('renders button and executes the handle function on click', () => {
    const handleIconButton = jest.fn();
    const { getByRole } = render(
      <IconButton handleClick={handleIconButton} icon={<ImHome />} />,
    );

    const iconButtonElement = getByRole('home-button');
    expect(iconButtonElement).toBeInTheDocument();

    userEvent.click(iconButtonElement);
    expect(handleIconButton).toBeCalled();
    expect(handleIconButton).toBeCalledTimes(1);
  });
});
