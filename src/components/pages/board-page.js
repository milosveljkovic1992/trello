import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { openModal } from 'store/popup-slice';
import { getCard } from 'store/card-slice';

import { LoadingSpinner } from 'components/atoms';
import { Board } from 'components/molecules';
import { CardPopup } from 'components/pages/card-popup';
import { SingleList } from 'components/organisms/single-list';
import { AddList } from 'components/atoms';


export const BoardPage = () => {
  const dispatch = useDispatch();
  const popupModalOpen = useSelector(state => state.popup.open);
  
  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;
  const { cardUrl } = urlParams;
  
  const [lists, setLists] = useState([]);
  const [pos, setPos] = useState(1);
  const [creatingNewList, setCreatingNewList] = useState(false);
  const [isBoardUpdated, setIsBoardUpdated] = useState(false);
  const [board, setBoard] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const titleRef = React.useRef(null);

  useEffect(() => {
    if (isActive) {
      titleRef.current.select();
    }
    if (urlParams['*']) {
      dispatch(openModal(cardUrl));
    }
    if (cardUrl) {
      dispatch(getCard({ id: cardUrl}))
    }
  }, [dispatch, isActive, cardUrl, urlParams]);

  useEffect(() => {
    
    if (!!boardId || isBoardUpdated) {
      
      const getLists = async() => {
        const response = await axios.get(`/1/boards/${boardId}/lists`);
        setLists(response.data);
        setPos(response.data[response.data.length - 1].pos + 1000);
      };

      const getBoard = async() => {
        const response = await axios.get(`/1/boards/${boardId}`);
        setBoardName(response.data.name);
        setBoard(response.data)
      }
      
      try {
        getLists();
        getBoard();
      } catch(error) {
        console.log(error);
      };

      setIsBoardUpdated(false);
    }

  }, [isBoardUpdated, boardId]);

  const handleBoardName = () => {
    const submitBoardName = async() => {
      axios.put(`/1/boards/${boardId}?name=${boardName}`)
    }

    try {
      submitBoardName();
      setIsActive(false);
    } catch (error) {
      console.log(error)
    }
  };

  const handleHomeButton = () => {
    navigate('/');
  }


 if (!board) {
  return <LoadingSpinner />
 }
 

  return (
    <>
    { !!popupModalOpen && !!cardUrl &&
      <Routes>
        <Route path={`c/${cardUrl}`} element={<CardPopup />} />
      </Routes>
     }
    {board && 
      <Board 
        ref={titleRef}
        board={board}
        boardName={boardName}
        setBoardName={setBoardName}
        handleBoardName={handleBoardName}
        handleHomeButton={handleHomeButton}
        isActive={isActive}
        setIsActive={setIsActive}
      >
      {lists && 
        <div className="board-inner-container">

          {lists.map(list => (
            <SingleList 
              key={list.id} 
              list={list}
              listId={list.id} 
              name={list.name} 
              setLists={setLists}
              setIsBoardUpdated={setIsBoardUpdated}
            />
          ))}

          <AddList 
            creatingNewList={creatingNewList}
            setCreatingNewList={setCreatingNewList}
            boardId={boardId}
            setIsBoardUpdated={setIsBoardUpdated}
            pos={pos}
          />

        </div>
      }
    </Board>
    }
    </>
  )
};