import { Container } from './login.styles';

import { API_KEY, BASE_URL } from 'global/constants';

export const Login = () => {
  return (
    <Container>
      <h1>Click here to</h1>
      <a
        href={`https://trello.com/1/authorize?return_url=${BASE_URL}&expiration=1hour&name=MyPersonalToken&scope=read,write&response_type=token&key=${API_KEY}`}
      >
        Login
      </a>
    </Container>
  );
};
