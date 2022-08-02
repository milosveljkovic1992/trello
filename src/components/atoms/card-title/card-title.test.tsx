import { render } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';
import { CardTitle } from './card-title';

describe('CardTitle', () => {
  it('renders h2 if the title was NOT clicked', () => {
    const { getByRole } = render(<CardTitle />);

    const headingElement = getByRole('heading');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders input if the title WAS clicked', () => {
    const { getByRole, getByLabelText } = render(<CardTitle />);

    const headingElement = getByRole('heading');
    userEvent.click(headingElement);

    const inputElement = getByLabelText('card-title-input');
    expect(inputElement).toBeInTheDocument();
    expect(headingElement).not.toBeInTheDocument();
  });

  it('changes value on user input', () => {
    const inputText = 'some text';
    const { getByRole, getByLabelText } = render(<CardTitle />);

    const headingElement = getByRole('heading');
    userEvent.click(headingElement);
    const inputElement = getByLabelText('card-title-input');
    userEvent.type(inputElement, inputText);

    expect(inputElement).toHaveValue(inputText);
  });

  it('saves value on user click away', () => {
    // arrange
    const inputText = 'some text';
    const { getByRole, getByLabelText, getByText } = render(<CardTitle />);

    // act
    const headingElement = getByRole('heading');
    userEvent.click(headingElement);

    const inputElement = getByLabelText('card-title-input');
    userEvent.type(inputElement, inputText);

    const containerElement = getByLabelText('card-title-container');
    userEvent.click(containerElement);

    const headingElementNew = getByRole('heading');

    // assert
    expect(inputElement).not.toBeInTheDocument();
    expect(headingElementNew).toBeInTheDocument();
    expect(getByText(inputText)).toBeInTheDocument();
  });
});
