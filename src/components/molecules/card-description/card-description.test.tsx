import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { CardDescription } from './card-description';

describe('CardDescription', () => {
  it('renders component', () => {
    const { getByTestId, queryByRole } = render(<CardDescription />);

    const containerElement = getByTestId('card-description-container');
    expect(containerElement).toBeInTheDocument();

    const descriptionElement = getByTestId('card-description-content');
    expect(descriptionElement).toBeInTheDocument();

    const inputElement = queryByRole('textbox');
    expect(inputElement).not.toBeInTheDocument();
  });

  it('renders input element when user clicks on description', () => {
    const { getByRole, getByTestId } = render(<CardDescription />);

    const descriptionElement = getByTestId('card-description-content');
    userEvent.click(descriptionElement);

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    const iconContainerElement = getByTestId('description-icon-container');
    expect(iconContainerElement).toBeInTheDocument();
  });

  it('renders description after "Save" button click', async () => {
    const sampleText = 'some description';
    const { getByRole, getByTestId, queryByRole, queryByTestId } = render(
      <CardDescription />,
    );

    const descriptionElement = getByTestId('card-description-content');
    userEvent.click(descriptionElement);

    const descriptionElementOnActiveInput = queryByTestId(
      'card-description-content',
    );
    expect(descriptionElementOnActiveInput).not.toBeInTheDocument();

    const inputElement = getByRole('textbox');
    userEvent.clear(inputElement);
    userEvent.type(inputElement, sampleText);

    const buttonElement = getByRole('button', { name: /save/i });
    expect(buttonElement).toBeInTheDocument();
    userEvent.click(buttonElement);

    const inputElementAfterInput = queryByRole('textbox');
    expect(inputElementAfterInput).not.toBeInTheDocument();

    const descriptionElementAfterInput = getByTestId(
      'card-description-content',
    );
    expect(descriptionElementAfterInput).toBeInTheDocument();
  });

  it('renders description after "Cancel" button click', async () => {
    const { getByTestId, queryByRole } = render(<CardDescription />);

    const descriptionElement = getByTestId('card-description-content');
    userEvent.click(descriptionElement);

    const closeButtonElement = getByTestId('close-icon-container');
    expect(closeButtonElement).toBeInTheDocument();
    userEvent.click(closeButtonElement);

    const inputElementAfterInput = queryByRole('textbox');
    expect(inputElementAfterInput).not.toBeInTheDocument();

    const descriptionElementAfterInput = getByTestId(
      'card-description-content',
    );
    expect(descriptionElementAfterInput).toBeInTheDocument();
  });
});
