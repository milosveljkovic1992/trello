import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Theme from 'global/Theme';
import { API_KEY, API_URL } from 'global/constants';

import { login, logout } from 'store/auth-slice';
import { getMemberInfo } from 'store/member-slice';

import { BoardPage, CardPopup, LandingPage } from 'components/pages';

import { ErrorSnackbar, LoadingSpinner, Login } from 'components/atoms';
import { throwError } from 'store/error-slice';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { APItoken, isAuth } = useSelector((state) => state.auth);
  const memberId = useSelector((state) => state.member.id);
  const { isLoading } = useSelector((state) => state.member);
  const { isErrorDisplayed } = useSelector((state) => state.errorHandler);
  const popupModalOpen = useSelector((state) => state.popup.open);

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

      axios.interceptors.request.use((config) => {
        if (APItoken !== localStorage.getItem('trelloToken')) {
          dispatch(throwError('Session expired. Please login to continue'));
          dispatch(logout());
          localStorage.removeItem('trelloToken');
          navigate('/');
        }
        return config;
      }),
        (error) => {
          return Promise.reject(error);
        };

      dispatch(getMemberInfo(APItoken));
    }
  }, [APItoken]);

  if (!isAuth) {
    return <Login />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Theme>
      {isErrorDisplayed &&
        createPortal(<ErrorSnackbar />, document.getElementById('error-root'))}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/b/:boardId/*" element={<BoardPage />}>
          {popupModalOpen && (
            <Route path="c/:cardUrl" element={<CardPopup />} />
          )}
        </Route>
      </Routes>
    </Theme>
  );
};

export default App;
