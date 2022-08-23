import userEvent from '@testing-library/user-event';

import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { render } from 'utils/test-utils';

import { SingleCard } from './single-card';

describe('SingleCard', () => {
  const index = 1;

  const sampleCard = {
    name: 'sample card',
    id: '123',
    idList: 'abc123',
    pos: 5000,
    badges: {
      comments: 3,
      description: true,
    },
    desc: 'sample description',
  };

  const SingleCardContainer = () => {
    return (
      <DragDropContext onDragEnd={jest.fn()}>
        <Droppable droppableId="123">
          {(provided: DroppableProvided) => (
            <div
              className="card-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <SingleCard index={index} card={sampleCard} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  it('renders component', () => {
    const { getByText, getByTestId } = render(<SingleCardContainer />);

    const containerElement = getByTestId('single-card');
    expect(containerElement).toBeInTheDocument();

    const titleElement = getByText(`${sampleCard.name}`);
    expect(titleElement).toBeInTheDocument();

    const badgesElement = getByTestId('card-badges');
    expect(badgesElement).toBeInTheDocument();

    const editButtonElement = getByTestId('edit-button');
    expect(editButtonElement).toBeInTheDocument();
  });

  it('opens link to individual card on user click', () => {
    const { getByTestId } = render(<SingleCardContainer />);

    expect(window.location.pathname).toBe('/');

    const linkElement = getByTestId('single-card-link');
    expect(linkElement).toBeInTheDocument();
    userEvent.click(linkElement);

    expect(window.location.pathname).toBe(`/c/${sampleCard.id}`);
  });

  it('opens and closes edit panel button click', () => {
    const { getByRole, getByTestId, queryByTestId } = render(
      <SingleCardContainer />,
    );

    const editButtonElement = getByTestId('edit-button');
    const editPanelElement = queryByTestId('edit-panel');
    expect(editPanelElement).not.toBeInTheDocument();

    userEvent.click(editButtonElement);

    const editPanelElementAfterClick = queryByTestId('edit-panel');
    expect(editPanelElementAfterClick).toBeInTheDocument();

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    const openCardButton = getByRole('button', { name: 'Open card' });
    expect(openCardButton).toBeInTheDocument();

    const moveCardButton = getByRole('button', { name: 'Move' });
    expect(moveCardButton).toBeInTheDocument();

    const deleteCardButton = getByRole('button', { name: 'Delete' });
    expect(deleteCardButton).toBeInTheDocument();

    const saveCardButton = getByRole('button', { name: 'Save' });
    expect(saveCardButton).toBeInTheDocument();

    userEvent.click(saveCardButton);

    const editPanelElementAfterSaveButtonClick = queryByTestId('edit-panel');
    expect(editPanelElementAfterSaveButtonClick).not.toBeInTheDocument();
  });
});
