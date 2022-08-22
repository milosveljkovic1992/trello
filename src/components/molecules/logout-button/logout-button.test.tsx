import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { render as defaultRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Theme from 'global/Theme';
import store, { RootState } from 'store';
import { render } from 'utils/test-utils';

import { LogoutButton } from './logout-button';
import { useSelector } from 'react-redux';

const MockLandingPage = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return <h1>{!isAuth && 'Please log in to continue'}</h1>;
};

const MockHomePage = () => {
  return <></>;
};

const MockBoardPage = () => {
  return <LogoutButton fixed={false} />;
};

describe('LogoutButton', () => {
  it('renders component', () => {
    const { getByRole } = render(<LogoutButton fixed={true} />);

    const logoutButtonElement = getByRole('button', { name: /log out/i });
    expect(logoutButtonElement).toBeInTheDocument();
  });

  it('redirects to landing page on click', async () => {
    const { getByRole } = defaultRender(
      <Router initialEntries={['/board']}>
        <Provider store={store}>
          <Theme>
            <Routes>
              <Route path="/" element={<MockLandingPage />} />
              <Route path="/home" element={<MockHomePage />} />
              <Route path="/board" element={<MockBoardPage />} />
            </Routes>
          </Theme>
        </Provider>
      </Router>,
    );

    const logoutButtonElement = getByRole('button', { name: /log out/i });
    expect(logoutButtonElement).toBeInTheDocument();

    userEvent.click(logoutButtonElement);

    const unauthenticatedUserMessage = getByRole('heading', { level: 1 });
    expect(unauthenticatedUserMessage.textContent).toBe(
      'Please log in to continue',
    );
  });
});
