import React, { useState, useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Theme from './Theme';
import { getMemberInfo } from './store/member-slice';
import { BoardContainer } from './containers/board-container';
import { SelectBoardContainer } from './containers/select-board-container';
import { CardPopupContainer } from './containers/card-popup-container';

axios.defaults.baseURL = 'https://api.trello.com';
axios.defaults.headers.common['Authorization'] = 'OAuth oauth_consumer_key="2c60f0038afd7c10c7f7b34541cf10e1", oauth_token="ea45abb0abdb247e28551121b047f432cab4d17c7adef5b641d5206d5f658561"';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
  const dispatch = useDispatch();
  const memberId = useSelector(state => state.member.id);
  const popupModalOpen = useSelector(state => state.popup.open);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (isLoading) {
      dispatch(getMemberInfo());
    }

    if (!!memberId) {
      setIsLoading(false);
    }

  }, [dispatch, isLoading, memberId]);

  if (isLoading) {
    return <></>
  }

  return (
    <Theme>
      
      <Routes>
          <Route exact path={'/'} element={<SelectBoardContainer />} />
          <Route path={`/b/:boardId//*`} element={<BoardContainer />} >
            {popupModalOpen && <Route path={`c/:cardUrl`} element={<CardPopupContainer />} />}
          </Route>
      </Routes>
    </Theme>
  )
};

export default App;