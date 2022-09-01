import userEvent from '@testing-library/user-event';

import { render, waitFor } from 'utils/test-utils';

import store from 'store';
import { finishEditingTitle } from 'store/card-slice';

import { CardTitle } from './card-title';

beforeEach(() => {
  store.dispatch(finishEditingTitle());
});

describe('CardTitle component', () => {
  it('renders h2 if the title was NOT clicked', () => {
    const { getByRole } = render(<CardTitle />);

    const headingElement = getByRole('heading', { level: 2 });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders input if the title WAS clicked', async () => {
    const { getByRole } = render(<CardTitle />);

    const headingElement = getByRole('heading', { level: 2 });
    userEvent.click(headingElement);

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(headingElement).not.toBeInTheDocument();
  });

  it('changes value on user input', async () => {
    const inputText = 'New card title';
    const { getByRole } = render(<CardTitle />);

    await waitFor(() => {
      expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    const headingElement = getByRole('heading', { level: 2 });
    userEvent.click(headingElement);
    const inputElement = getByRole('textbox');
    userEvent.type(inputElement, inputText);

    expect(inputElement).toHaveValue(inputText);

    userEvent.tab();

    await waitFor(() => {
      const headingElementNew = getByRole('heading', { level: 2 });
      expect(headingElementNew).toBeInTheDocument();
      expect(headingElementNew.textContent).toBe(inputText);
    });
  });

  it('saves value on user click away', () => {
    const inputText = 'New card title';
    const { getByRole } = render(<CardTitle />);

    const headingElement = getByRole('heading', { level: 2 });
    userEvent.click(headingElement);

    const inputElement = getByRole('textbox');
    userEvent.type(inputElement, inputText);

    const containerElement = getByRole('card-title');
    userEvent.click(containerElement);

    const headingElementNew = getByRole('heading', { level: 2 });

    expect(inputElement).not.toBeInTheDocument();
    expect(headingElementNew).toBeInTheDocument();
    expect(headingElementNew.textContent).toBe(inputText);
  });
});
