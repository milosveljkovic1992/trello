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

  useEffect(() => {
    if (!!selectedBoardId || isBoardUpdated) {
      
      const getLists = async() => {
        const response = await axios.get(`/1/boards/${selectedBoardId}/lists`);
        setLists(response.data);
        setPos(response.data[response.data.length - 1].pos * 1000);
      };
      
      try {
        getLists();
      } catch(error) {
        console.log(error);
      };


      setIsBoardUpdated(false);
    }

  }, [isBoardUpdated, selectedBoardId]);


  return (
    <>
    { popupModalOpen && urlParams &&
      <Routes>
        <Route path={urlParams['*']} element={<CardPopupContainer />} />
      </Routes>
     }
    
    <Board>
      <Board.Header></Board.Header>
      {lists && 
        <Board.Inner>

          {lists.map(list => (
            <SingleList 
              key={list.id} 
              listId={list.id} 
              name={list.name} 
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

    </>
  )
};