import { render } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import { AiOutlinePlus } from 'react-icons/ai';
import { AddButton } from './add-button';

describe('AddButton', () => {
  it('renders add button', () => {
    const onClickMock = jest.fn();
    const text = 'Test';
    const icon = <AiOutlinePlus />;

    const { getByText } = render(
      <AddButton onClick={onClickMock} icon={icon}>
        {text}
      </AddButton>,
    );

    const buttonTest1 = getByText(text);
    expect(buttonTest1).toBeInTheDocument();

    const buttonTest2 = getByText(text);
    userEvent.click(buttonTest2);
    expect(onClickMock).toBeCalled();
    expect(onClickMock).toBeCalledTimes(1);
  });
});
