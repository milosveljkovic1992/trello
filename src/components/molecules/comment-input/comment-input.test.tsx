import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { CommentInput } from './comment-input';

describe('CommentInput component', () => {
  it('renders textarea', () => {
    const sampleText = 'some text';
    const { getByRole, getByPlaceholderText } = render(<CommentInput />);

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();

    const buttonElement = getByRole('button', { hidden: true });
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(inputElement);
    const buttonElementAfterInputFocus = getByRole('button', { name: 'Save' });
    expect(buttonElementAfterInputFocus).toBeInTheDocument();

    userEvent.tab();
    const buttonElementAfterBlur = getByRole('button', { hidden: true });
    expect(buttonElementAfterBlur).toBeInTheDocument();

    userEvent.click(inputElement);
    expect(buttonElementAfterInputFocus).toBeInTheDocument();

    userEvent.type(inputElement, sampleText);
    userEvent.tab();

    const buttonElementAfterUserInput = getByRole('button', { name: 'Save' });
    expect(buttonElementAfterUserInput).toBeInTheDocument();

    userEvent.click(buttonElementAfterUserInput);

    const buttonElementAfterSubmit = getByRole('button', { hidden: true });
    expect(buttonElementAfterSubmit).toBeInTheDocument();
    expect(inputElement.textContent).toBe('');
  });
});
