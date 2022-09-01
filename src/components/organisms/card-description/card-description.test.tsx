import userEvent from '@testing-library/user-event';
import { act, render, waitFor } from 'utils/test-utils';

import store from 'store';
import { getCard } from 'store/card-slice';

import { CardDescription } from './card-description';

beforeEach(async () => {
  act(() => {
    store.dispatch(getCard({ id: 'cardId1' }));
  });

  await waitFor(() => {
    const state = store.getState();
    expect(state.card.isLoading).not.toBeTruthy();
  });
});

describe('CardDescription', () => {
  it('renders component and switches to input on user click', () => {
    const { getByRole, getByTestId, queryByRole, queryByTestId } = render(
      <CardDescription />,
    );

    const containerElement = getByTestId('card-description-container');
    expect(containerElement).toBeInTheDocument();

    const descriptionElement = getByTestId('card-description-content');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(
      'Add a more detailed description...',
    );

    const inputElement = queryByRole('textbox');
    expect(inputElement).not.toBeInTheDocument();

    userEvent.click(descriptionElement);

    const descriptionElementAfterClick = queryByTestId(
      'card-description-content',
    );
    expect(descriptionElementAfterClick).not.toBeInTheDocument();

    const inputElementAfterClick = getByRole('textbox');
    expect(inputElementAfterClick).toBeInTheDocument();

    const iconContainerElement = getByTestId('description-icon-container');
    expect(iconContainerElement).toBeInTheDocument();

    const saveButtonElement = getByRole('button', { name: /save/i });
    expect(saveButtonElement).toBeInTheDocument();

    const closeButtonElement = getByTestId('close-icon-container');
    expect(closeButtonElement).toBeInTheDocument();

    userEvent.click(closeButtonElement);

    expect(inputElementAfterClick).not.toBeInTheDocument();
    expect(iconContainerElement).not.toBeInTheDocument();
    expect(saveButtonElement).not.toBeInTheDocument();
    expect(closeButtonElement).not.toBeInTheDocument();
  });

  it('renders description after "Save" button click', async () => {
    const sampleText = 'some description';
    const { getByRole, getByTestId, queryByRole } = render(<CardDescription />);

    const descriptionElement = getByTestId('card-description-content');
    userEvent.click(descriptionElement);

    const inputElement = getByRole('textbox');
    userEvent.clear(inputElement);
    userEvent.type(inputElement, sampleText);

    const saveButtonElement = getByRole('button', { name: /save/i });
    userEvent.click(saveButtonElement);

    await waitFor(() => {
      const state = store.getState();
      expect(state.card.details.desc).toBe(sampleText);
    });

    const inputElementAfterInput = queryByRole('textbox');
    expect(inputElementAfterInput).not.toBeInTheDocument();

    const descriptionElementAfterInput = getByTestId(
      'card-description-content',
    );
    expect(descriptionElementAfterInput).toHaveTextContent(sampleText);
  });

  it('renders old description after "Cancel" button click', async () => {
    const sampleText = 'some description';
    const { getByRole, getByTestId, queryByRole } = render(<CardDescription />);

    const descriptionElement = getByTestId('card-description-content');
    userEvent.click(descriptionElement);

    const inputElement = getByRole('textbox');
    userEvent.type(inputElement, sampleText);

    const closeButtonElement = getByTestId('close-icon-container');
    userEvent.click(closeButtonElement);

    const inputElementAfterCancel = queryByRole('textbox');
    expect(inputElementAfterCancel).not.toBeInTheDocument();

    const descriptionElementAfterCancel = getByTestId(
      'card-description-content',
    );
    expect(descriptionElementAfterCancel).toBeInTheDocument();
    expect(descriptionElementAfterCancel).not.toHaveTextContent(sampleText);
    expect(descriptionElementAfterCancel).toHaveTextContent(
      'Add a more detailed description...',
    );
  });
});
