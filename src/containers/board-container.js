import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';

import { Board, BoardList } from '../components';
import { CardPopupContainer } from './card-popup-container';
import { NewListContainer } from './list/new-list-container';
import { SingleList } from './list/single-list';
import { AddList } from './buttons/add-list';


export const BoardContainer = ({ selectedBoardId }) => {
  const popupModalOpen = useSelector(state => state.popup.open);
  
  const urlParams = useParams();
  const { boardId } = urlParams;
  
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
  }, [isActive]);

  useEffect(() => {
    if (!!selectedBoardId || isBoardUpdated) {
      
      const getLists = async() => {
        const response = await axios.get(`/1/boards/${selectedBoardId}/lists`);
        setLists(response.data);
        setPos(response.data[response.data.length - 1].pos + 1000);
      };

      const getBoard = async() => {
        const response = await axios.get(`/1/boards/${selectedBoardId}`);
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

  }, [isBoardUpdated, selectedBoardId]);

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
  }

 if (!board) {
  return <></>
 }

  return (
    <>
    { popupModalOpen && urlParams &&
      <Routes>
        <Route path={urlParams['*']} element={<CardPopupContainer />} />
      </Routes>
     }
    {board && 
    <Board backgroundImage={board.prefs.backgroundImage}>
      <Board.Header>
        
        <>
          <Board.Title
            isActive={isActive}
            onClick={() => setIsActive(true)}
          >
            {boardName}
          </Board.Title>
          <Board.TitleInput 
            ref={titleRef}
            isActive={isActive}
            value={boardName} 
            onChange={e => setBoardName(e.target.value)}
            onBlur={handleBoardName}
            size={boardName.length - 6}
          ></Board.TitleInput>
        </>
        
      </Board.Header>
      {lists && 
        <Board.Inner>

          {lists.map(list => (
            <SingleList 
              key={list.id} 
              listId={list.id} 
              name={list.name} 
              setIsBoardUpdated={setIsBoardUpdated}
            />
          ))}

          <BoardList>
            {!creatingNewList
              ? <AddList setCreatingNewList={setCreatingNewList} />
              : <NewListContainer 
                setCreatingNewList={setCreatingNewList}
                boardId={boardId}
                setIsBoardUpdated={setIsBoardUpdated}
                pos={pos}
              />
            }
          </BoardList>

        </Board.Inner>
      }
    </Board>
    }
    </>
  )
};