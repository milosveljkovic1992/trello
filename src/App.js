import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Theme from './Theme';

import { BoardPage } from 'components/pages/board-page';
import { LandingPage } from 'components/pages/landing-page';
import { CardPopup } from 'components/pages/card-popup';

import { login } from 'store/auth';
import { getMemberInfo } from 'store/member-slice';

import { LoadingSpinner, Login } from 'components/atoms';


axios.defaults.baseURL = 'https://api.trello.com';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
  const dispatch = useDispatch();
  const { APIkey } = useSelector(state => state.auth);
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
      axios.defaults.headers.common['Authorization'] = `OAuth oauth_consumer_key="${APIkey}", oauth_token="${trelloToken}"`;
      dispatch(getMemberInfo(trelloToken));
    }

    if (!!memberId) {
      setIsLoading(false);
    }

  }, [dispatch, APIkey, isLoading, memberId]);

  if (!localStorage.getItem('trelloToken')) {
    return ( 
      <Login>
        <Login.Text>Click here to</Login.Text>
        <Login.Button href={`https://trello.com/1/authorize?return_url=http://localhost:3000&expiration=1day&name=MyPersonalToken&scope=read,write&response_type=token&key=${APIkey}`}>Login</Login.Button>
      </Login>
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