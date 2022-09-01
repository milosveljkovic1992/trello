import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import axios from 'axios';

import Theme from 'global/Theme';
import { API_KEY, API_URL } from 'global/constants';

import { RootState, useAppDispatch } from 'store';
import { login, logout } from 'store/auth-slice';
import { getMemberInfo } from 'store/member-slice';
import { resetError, throwError } from 'store/error-slice';

import { RenderRoutes } from 'routes';
import { LoadingSpinner, Login } from 'components/atoms';
import { ErrorSnackbar } from 'components/molecules';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const errorRootElement = document.getElementById('error-root');

  const { APItoken, isAuth } = useSelector((state: RootState) => state.auth);
  const memberId = useSelector((state: RootState) => state.member.id);
  const { isLoading } = useSelector((state: RootState) => state.member);
  const { errorMessage, isErrorDisplayed } = useSelector(
    (state: RootState) => state.errorHandler,
  );

  const handleErrorReset = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    const trelloToken = localStorage.getItem('trelloToken');

    if (!trelloToken && !!location.hash) {
      const token = location.hash.replace('#token=', '');
      localStorage.setItem('trelloToken', token);
      dispatch(login(token));
    }

    if (trelloToken && !isAuth) {
      dispatch(login(trelloToken));
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (isAuth && !memberId) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${APItoken}"`;

      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response.status === 401) {
            dispatch(logout());
            localStorage.removeItem('trelloToken');
            navigate('/');
            dispatch(throwError('Session expired. Please login to continue'));
          }
          return Promise.reject(error);
        },
      );

      dispatch(getMemberInfo(APItoken));
    }
  }, [APItoken]);

  return (
    <Theme>
      {isErrorDisplayed &&
        !!errorRootElement &&
        createPortal(
          <ErrorSnackbar
            errorMessage={errorMessage}
            handleErrorReset={handleErrorReset}
          />,
          errorRootElement,
        )}
      {!isAuth ? <Login /> : isLoading ? <LoadingSpinner /> : <RenderRoutes />}
    </Theme>
  );
};

export default App;
