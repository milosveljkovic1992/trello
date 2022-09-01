import userEvent from '@testing-library/user-event';
import { render, waitFor } from 'utils/test-utils';

import store from 'store';
import { getCard } from 'store/card-slice';

import { CommentInput } from './comment-input';

beforeAll(async () => {
  store.dispatch(getCard({ id: 'cardId1' }));
  await waitFor(() => {
    const state = store.getState();
    expect(state.card.details.id).toBe('cardId1');
  });
});

describe('CommentInput component', () => {
  it('renders textarea and handles user events', async () => {
    const state = store.getState();
    const comments = state.comments.commentsList;
    expect(comments.length).toBe(2);

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

    await waitFor(() => {
      const state = store.getState();
      const comments = state.comments.commentsList;
      expect(comments.length).toBe(3);
      expect(comments[0].data.text).toBe(sampleText);
    });

    const buttonElementAfterSubmit = getByRole('button', { hidden: true });
    expect(buttonElementAfterSubmit).toBeInTheDocument();
    expect(inputElement.textContent).toBe('');
  });
});
