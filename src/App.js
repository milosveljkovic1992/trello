import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Theme from './Theme';

import { API_KEY, BASE_URL } from 'constants';

import { login } from 'store/auth';
import { getMemberInfo } from 'store/member-slice';

import { BoardPage, CardPopup, LandingPage } from 'components/pages';

import { LoadingSpinner, Login } from 'components/atoms';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const App = () => {
  const dispatch = useDispatch();
  const memberId = useSelector(state => state.member.id);
  const popupModalOpen = useSelector(state => state.popup.open);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trelloToken = localStorage.getItem('trelloToken');

    if (!trelloToken && document.location.hash.includes('#token=')) {
      const token = document.location.hash.replace('#token=', '');
      dispatch(login(token));
      localStorage.setItem('trelloToken', token);
    }

    if (trelloToken && isLoading) {
      axios.defaults.headers.common['Authorization'] = `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${trelloToken}"`;
      dispatch(getMemberInfo(trelloToken));
    }

    if (!!memberId) {
      setIsLoading(false);
    }

  }, [dispatch, isLoading, memberId]);

  if (!localStorage.getItem('trelloToken')) {
    return ( 
        <Login />
      )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Theme>
      <Routes>
          <Route exact path={'/'} element={<LandingPage />} />
          <Route path={`/b/:boardId//*`} element={<BoardPage />} >
            {popupModalOpen && <Route path={`c/:cardUrl`} element={<CardPopup />} />}
          </Route>
      </Routes>
    </Theme>
  )
};

export default App;