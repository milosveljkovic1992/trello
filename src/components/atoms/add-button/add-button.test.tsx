import { render } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import { AiOutlinePlus } from 'react-icons/ai';
import { AddButton } from './add-button';

describe('AddButton component', () => {
  it('renders add button', () => {
    const onClickMock = jest.fn();
    const text = 'Test';
    const icon = <AiOutlinePlus />;

    const { getByText } = render(
      <AddButton onClick={onClickMock} icon={icon}>
        {text}
      </AddButton>,
    );

    const buttonElement = getByText(text);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(buttonElement);
    expect(onClickMock).toBeCalled();
    expect(onClickMock).toBeCalledTimes(1);
  });
});
