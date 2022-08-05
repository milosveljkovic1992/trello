import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { SingleComment } from './single-comment';

describe('SingleComment', () => {
  const comment = {
    type: 'commentAction',
    id: '123',
    data: {
      text: 'some comment',
    },
    memberCreator: {
      fullName: 'John Doe',
    },
    date: 'Fri Aug 12 2022 14:11:35',
  };

  it('renders component', () => {
    const { getByTestId } = render(<SingleComment comment={comment} />);

    const containerElement = getByTestId('single-comment');
    expect(containerElement).toBeInTheDocument();
  });

  it('renders edit component on "Edit" click', () => {
    const { getByText, getByTestId, queryByText } = render(
      <SingleComment comment={comment} />,
    );

    const editButton = getByText('Edit');
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const editButtonAfterClick = queryByText('Edit');
    expect(editButtonAfterClick).not.toBeInTheDocument();

    const editCommentContainer = getByTestId('edit-comment');
    expect(editCommentContainer).toBeInTheDocument();
  });
});
