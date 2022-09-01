import { render } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import { AiOutlinePlus } from 'react-icons/ai';
import { ButtonWithIcon } from './button-with-icon';

describe('ButtonWithIcon component', () => {
  it('renders add button', () => {
    const onClickMock = jest.fn();
    const text = 'Test';
    const icon = <AiOutlinePlus />;

    const { getByText } = render(
      <ButtonWithIcon onClick={onClickMock} icon={icon}>
        {text}
      </ButtonWithIcon>,
    );

    const buttonElement = getByText(text);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(buttonElement);
    expect(onClickMock).toBeCalled();
    expect(onClickMock).toBeCalledTimes(1);
  });
});
