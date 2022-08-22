import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { render as renderWithoutProviders } from '@testing-library/react';
import { render } from 'utils/test-utils';
import { Provider } from 'react-redux';

import Theme from 'global/Theme';
import store, { RootState } from 'store';

import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import { HomeButton } from './home-button';

const MockBoardPage = () => {
  return <HomeButton />;
};

const MockLandingPage = () => {
  const board = useSelector((state: RootState) => state.board.details);
  const noBoardSelected = !board.id;
  return <h1>{noBoardSelected && 'Select board'}</h1>;
};

describe('HomeButton', () => {
  it('renders button', () => {
    const { getByRole } = render(<HomeButton />);

    const homeButtonElement = getByRole('home-button');
    expect(homeButtonElement).toBeInTheDocument();
  });

  it('renders button', () => {
    const { getByRole } = renderWithoutProviders(
      <Router initialEntries={['/board']}>
        <Provider store={store}>
          <Theme>
            <Routes>
              <Route path="/" element={<MockLandingPage />} />
              <Route path="board" element={<MockBoardPage />} />
            </Routes>
          </Theme>
        </Provider>
      </Router>,
    );

    const homeButtonElement = getByRole('home-button');
    expect(homeButtonElement).toBeInTheDocument();

    userEvent.click(homeButtonElement);

    const landingPageMessage = getByRole('heading', { level: 1 });
    expect(landingPageMessage.textContent).toBe('Select board');
  });
});
