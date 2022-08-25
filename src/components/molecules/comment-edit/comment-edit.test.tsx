import { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'utils/test-utils';
import { CommentEdit } from './comment-edit';

const CommentEditParent = () => {
  const [isEditActive, setIsEditActive] = useState(true);

  const handleClose = () => {
    setIsEditActive(false);
  };
  const sampleComment = {
    type: 'comment',
    id: 'abc123',
    data: {
      text: 'comment text content',
    },
    memberCreator: {
      fullName: 'John Doe',
    },
    date: 'Tue Aug 02 2022 16:55:09 GMT+0200 (Central European Summer Time)',
  };

  return (
    <>
      {isEditActive && (
        <CommentEdit comment={sampleComment} handleClose={handleClose} />
      )}
    </>
  );
};

describe('CommentEdit', () => {
  it('renders component and updated comment', () => {
    const sampleText = 'new comment text';
    const { getByRole, getByPlaceholderText, getByTestId } = render(
      <CommentEditParent />,
    );

    const containerElement = getByTestId('edit-comment');
    expect(containerElement).toBeInTheDocument();

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveTextContent('comment text content');

    const iconElement = getByTestId('icon-container');
    expect(iconElement).toBeInTheDocument();

    const saveButtonElement = getByRole('button', { name: 'Save' });
    expect(saveButtonElement).toBeInTheDocument();

    userEvent.type(inputElement, sampleText);
    expect(inputElement).toHaveTextContent(sampleText);

    userEvent.click(saveButtonElement);
    expect(containerElement).not.toBeInTheDocument();
  });
});
