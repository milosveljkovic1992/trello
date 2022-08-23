import { render } from 'utils/test-utils';
import { Login } from './login';

import { API_KEY, BASE_URL } from 'global/constants';

describe('Login', () => {
  it('renders component', () => {
    const { getByRole, getByText } = render(<Login />);

    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement.textContent).toBe('Click here to');

    const buttonElement = getByText('Login');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute(
      'href',
      `https://trello.com/1/authorize?return_url=${BASE_URL}&expiration=1day&name=MyPersonalToken&scope=read,write&response_type=token&key=${API_KEY}`,
    );
  });
});
