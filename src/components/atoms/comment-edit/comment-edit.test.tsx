import { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'utils/test-utils';
import { CommentEdit } from './comment-edit';

const CommentEditParent = () => {
  const [isActive, setIsActive] = useState(true);

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
      {isActive && (
        <CommentEdit
          comment={sampleComment}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      )}
    </>
  );
};

describe('CommentEdit component', () => {
  it('renders textarea', () => {
    const { getByPlaceholderText } = render(<CommentEditParent />);

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveTextContent('comment text content');
  });

  it('renders "Save" button', () => {
    const { getByRole } = render(<CommentEditParent />);

    const buttonElement = getByRole('button', { name: 'Save' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders icon', () => {
    const { getByTestId } = render(<CommentEditParent />);

    const iconElement = getByTestId('icon-container');
    expect(iconElement).toBeInTheDocument();
  });

  it('updates textarea on user input', () => {
    const sampleText = 'new input text';
    const { getByPlaceholderText } = render(<CommentEditParent />);

    const inputElement = getByPlaceholderText('Write a comment', {
      exact: false,
    });

    userEvent.type(inputElement, sampleText);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveTextContent(sampleText);
  });

  it('unmounts on "Save" button click', () => {
    const { getByRole, getByTestId } = render(<CommentEditParent />);
    const containerElement = getByTestId('edit-comment');
    expect(containerElement).toBeInTheDocument();

    const buttonElement = getByRole('button', { name: 'Save' });
    userEvent.click(buttonElement);

    expect(containerElement).not.toBeInTheDocument();
  });

  it('unmounts on "Cancel" button click', () => {
    const { getByTestId } = render(<CommentEditParent />);
    const containerElement = getByTestId('edit-comment');
    expect(containerElement).toBeInTheDocument();

    const buttonElement = getByTestId('icon-container');
    userEvent.click(buttonElement);

    expect(containerElement).not.toBeInTheDocument();
  });
});
