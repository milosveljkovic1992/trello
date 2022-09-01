import userEvent from '@testing-library/user-event';
import { render, waitFor } from 'utils/test-utils';

import store from 'store';
import { getCard } from 'store/card-slice';

import { CommentEdit } from './comment-edit';
import { submitComment } from 'store/comments-slice';

const oldCommentText = 'random comment';

beforeAll(async () => {
  store.dispatch(getCard({ id: 'cardId1' }));
  await waitFor(() => {
    const state = store.getState();
    expect(state.card.details.id).toBe('cardId1');
  });

  const state = store.getState();
  const card = state.card.details;

  store.dispatch(submitComment({ card, comment: oldCommentText }));
  await waitFor(() => {
    const state = store.getState();
    const comments = state.comments.commentsList;
    expect(comments.length).toBe(3);
  });
});

describe('CommentEdit', () => {
  const handleClose = jest.fn();

  it('renders component and updates comment', async () => {
    const state = store.getState();
    const sampleComment = state.comments.commentsList.find(
      (comment) => comment.data.text === oldCommentText,
    );
    if (!sampleComment) return;

    const sampleText = 'new comment text';
    const { getByRole, getByPlaceholderText, getByTestId } = render(
      <CommentEdit comment={sampleComment} handleClose={handleClose} />,
    );

    const containerElement = getByTestId('edit-comment');
    expect(containerElement).toBeInTheDocument();

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveTextContent(oldCommentText);

    const iconElement = getByTestId('icon-container');
    expect(iconElement).toBeInTheDocument();

    userEvent.click(iconElement);
    expect(handleClose).toBeCalled();
    expect(handleClose).toBeCalledTimes(1);

    const saveButtonElement = getByRole('button', { name: 'Save' });
    expect(saveButtonElement).toBeInTheDocument();

    userEvent.clear(inputElement);
    userEvent.type(inputElement, sampleText);

    userEvent.click(saveButtonElement);
    expect(handleClose).toBeCalled();
    expect(handleClose).toBeCalledTimes(2);

    await waitFor(() => {
      const state = store.getState();
      const editedComment = state.comments.commentsList.find(
        (comment) => comment.id === sampleComment.id,
      );
      expect(editedComment?.data.text).not.toBe(oldCommentText);
      expect(editedComment?.data.text).toBe(sampleText);
    });
  });
});
