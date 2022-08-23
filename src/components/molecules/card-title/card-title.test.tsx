import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

import { render, waitFor } from 'utils/test-utils';

import { useAppDispatch } from 'store';
import { finishEditingTitle } from 'store/card-slice';

import { CardTitle } from './card-title';

const CleanupComp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(finishEditingTitle());
  }, []);

  return <></>;
};

beforeEach(() => {
  render(<CleanupComp />);
});

afterEach(() => {
  render(<CleanupComp />);
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
    const inputText = 'some text';
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
    });
  });

  it('saves value on user click away', () => {
    const inputText = 'some text';
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
