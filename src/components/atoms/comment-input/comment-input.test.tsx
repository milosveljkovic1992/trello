import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { CommentInput } from './comment-input';

describe('CommentInput component', () => {
  it('renders textarea', () => {
    const { getByPlaceholderText } = render(<CommentInput />);

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();
  });

  it('renders button as HIDDEN on initial render', () => {
    const { getByRole } = render(<CommentInput />);

    const buttonElement = getByRole('button', { hidden: true });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders button after textarea focus', () => {
    const { getByRole, getByPlaceholderText } = render(<CommentInput />);

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();

    userEvent.click(inputElement);

    const buttonElement = getByRole('button', { name: 'Save' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders button as HIDDEN if textarea is unchanged and not focused', () => {
    const { getByRole, getByPlaceholderText } = render(<CommentInput />);

    const containerElement = getByRole('input-comment');
    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();

    userEvent.click(inputElement);

    const buttonElement = getByRole('button', { name: 'Save' });
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(containerElement);

    const buttonElementHidden = getByRole('button', { hidden: true });
    expect(buttonElementHidden).toBeInTheDocument();
  });

  it('renders button if textarea is not empty and not focused', () => {
    const sampleText = 'some text';
    const { getByRole, getByPlaceholderText } = render(<CommentInput />);

    const containerElement = getByRole('input-comment');
    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();

    userEvent.click(inputElement);

    const buttonElement = getByRole('button', { name: 'Save' });
    expect(buttonElement).toBeInTheDocument();

    userEvent.type(inputElement, sampleText);
    userEvent.click(containerElement);

    const buttonElement2 = getByRole('button', { name: 'Save' });
    expect(buttonElement2).toBeInTheDocument();
  });

  it('resets textarea on comment submit', () => {
    const sampleText = 'some text';
    const { getByRole, getByPlaceholderText } = render(<CommentInput />);

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();

    userEvent.click(inputElement);

    const buttonElement = getByRole('button', { name: 'Save' });
    expect(buttonElement).toBeInTheDocument();

    userEvent.type(inputElement, sampleText);
    userEvent.click(buttonElement);

    const buttonElementHidden = getByRole('button', {
      hidden: true,
    });
    expect(buttonElementHidden).toBeInTheDocument();
    expect(inputElement.textContent).toBe('');
  });
});
