import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Theme from 'global/Theme';
import { API_KEY, API_URL } from 'global/constants';

import { login, logout } from 'store/auth';
import { getMemberInfo } from 'store/member-slice';

import { BoardPage, CardPopup, LandingPage } from 'components/pages';

import { LoadingSpinner, Login } from 'components/atoms';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { APItoken, isAuth } = useSelector((state) => state.auth);
  const memberId = useSelector((state) => state.member.id);
  const { isLoading } = useSelector((state) => state.member);
  const popupModalOpen = useSelector((state) => state.popup.open);

  useEffect(() => {
    const trelloToken = localStorage.getItem('trelloToken');

    if (!trelloToken && document.location.hash.includes('#token=')) {
      const token = document.location.hash.replace('#token=', '');
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
          if (APItoken !== localStorage.getItem('trelloToken')) {
            navigate('/');
            localStorage.removeItem('trelloToken');
            dispatch(logout());

            return Promise.reject(
              `There's been an authorization missmatch. Redirecting to login page...`,
            );
          } else {
            return response;
          }
        },
        (error) => {
          if (error.response.status === 401) {
            console.error(
              `An authorization error has occured. Redirecting to login page...`,
            );
            navigate('/');
            localStorage.removeItem('trelloToken');
            dispatch(logout());
          } else {
            console.log(error);
          }
          return Promise.reject(error);
        },
      );
      dispatch(getMemberInfo(APItoken));
    }
  }, [APItoken]);

  if (!localStorage.getItem('trelloToken')) {
    return <Login />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Theme>
      <Routes>
        <Route exact path={'/'} element={<LandingPage />} />
        <Route path={`/b/:boardId//*`} element={<BoardPage />}>
          {popupModalOpen && (
            <Route path={`c/:cardUrl`} element={<CardPopup />} />
          )}
        </Route>
      </Routes>
    </Theme>
  );
};

export default App;
