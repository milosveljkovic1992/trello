import { render } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';
import { CardTitle } from './card-title';

describe('CardTitle component', () => {
  it('renders h2 if the title was NOT clicked', () => {
    const { getByRole } = render(<CardTitle />);

    const headingElement = getByRole('heading', { level: 2 });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders input if the title WAS clicked', () => {
    const { getByRole } = render(<CardTitle />);

    const headingElement = getByRole('heading', { level: 2 });
    userEvent.click(headingElement);

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(headingElement).not.toBeInTheDocument();
  });

  it('changes value on user input', () => {
    const inputText = 'some text';
    const { getByRole } = render(<CardTitle />);

    const headingElement = getByRole('heading', { level: 2 });
    userEvent.click(headingElement);
    const inputElement = getByRole('textbox');
    userEvent.type(inputElement, inputText);

    expect(inputElement).toHaveValue(inputText);
  });

  it('saves value on user click away', () => {
    // arrange
    const inputText = 'some text';
    const { getByRole } = render(<CardTitle />);

    // act
    const headingElement = getByRole('heading', { level: 2 });
    userEvent.click(headingElement);

    const inputElement = getByRole('textbox');
    userEvent.type(inputElement, inputText);

    const containerElement = getByRole('card-title');
    userEvent.click(containerElement);

    const headingElementNew = getByRole('heading', { level: 2 });

    // assert
    expect(inputElement).not.toBeInTheDocument();
    expect(headingElementNew).toBeInTheDocument();
    expect(headingElementNew.textContent).toBe(inputText);
  });
});
