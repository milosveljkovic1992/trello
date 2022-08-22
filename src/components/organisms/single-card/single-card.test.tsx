import userEvent from '@testing-library/user-event';
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

  it('renders component', () => {
    const { getByText, getByTestId } = render(
      <SingleCard index={index} card={sampleCard} />,
    );

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
    const { getByTestId } = render(
      <SingleCard index={index} card={sampleCard} />,
    );

    expect(window.location.pathname).toBe('/');

    const linkElement = getByTestId('single-card-link');
    expect(linkElement).toBeInTheDocument();
    userEvent.click(linkElement);

    expect(window.location.pathname).toBe(`/c/${sampleCard.id}`);
  });

  it('opens edit panel on edit icon click', () => {
    const { getByTestId, queryByTestId } = render(
      <SingleCard index={index} card={sampleCard} />,
    );

    const editButtonElement = getByTestId('edit-button');
    const editPanelElement = queryByTestId('edit-panel');
    expect(editPanelElement).not.toBeInTheDocument();

    userEvent.click(editButtonElement);

    const editPanelElementAfterClick = queryByTestId('edit-panel');
    expect(editPanelElementAfterClick).toBeInTheDocument();
  });
});
