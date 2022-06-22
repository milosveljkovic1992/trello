import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

import { BoardSelect } from '../components';
import { LoadingSpinner } from './loading-spinner';
import { setBoards, addBoard, deleteBoard } from '../store/boards-slice';


export const SelectBoardContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boards = useSelector(state => state.boards.boardsArray);
    const isLoading = useSelector(state => state.boards.isLoading);
    const member = useSelector(state => state.member);

    const [isInputActive, setIsInputActive] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState('');

    const inputRef = React.useRef(null);
    const btnRef = React.useRef(null);

    const handleActive = e => {
        setIsInputActive(true);
    };

    const handleClick = (e, board) => {
        e.stopPropagation();
        if (e.target.closest('.delete-btn')) return;

        const fetchBoard = async() => {
            await axios.get(`/1/boards/${board.id}`);
        };

        try {
            fetchBoard();
            navigate(`/b/${board.id}`);
        } catch (error) {
            console.log(error);
        }

    }

    const handleCreateNew = () => {
        const sendCreateRequest = async() => {
            const response = await axios.post(`/1/boards/?name=${newBoardTitle}`);
            dispatch(addBoard(response.data));
        };

        if (newBoardTitle.trim().length > 0) {
            try {
                sendCreateRequest();
            } catch (error) {
                console.log(error);
            }
        }

        setNewBoardTitle('');
        setIsInputActive(false);
    };

    const handleDelete = (board) => {
        const sendDeleteRequest = async() => {
            await axios.delete(`/1/boards/${board.id}`)
        }

        try {
            sendDeleteRequest();
            dispatch(deleteBoard(board));
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (isInputActive) {
            inputRef.current.focus();
            btnRef.current.classList.add('slide-in-top');
        }
    }, [boards, isInputActive]);
    
    useEffect(() => {
        const getMemberBoards = async() => {
            const response = await axios.get(`/1/members/${member.id}/boards`);
            dispatch(setBoards(response.data))
        }

        if (member.id && isLoading) {
            try {
                getMemberBoards();
            } catch (error) {
                console.log(error)
            }
        }
    }, [dispatch, member, isLoading]);
    
    if (isLoading) {
        return <LoadingSpinner />
    }


    return (
        <BoardSelect>
        <BoardSelect.Inner>
            <BoardSelect.Heading>
                <BoardSelect.HeadingText>Your workplaces</BoardSelect.HeadingText>
            </BoardSelect.Heading>

            <BoardSelect.CardsContainer>

            {boards.length > 0 && boards.map(board => (
                <BoardSelect.SingleCardContainer key={board.id} onClick={e => handleClick(e, board)}>
                    <BoardSelect.Card>

                        <BoardSelect.Title>{board.name}</BoardSelect.Title>
                        <BoardSelect.Delete className="delete-btn" onClick={() => handleDelete(board)}>
                            <FaTrashAlt />
                        </BoardSelect.Delete>

                    </BoardSelect.Card>
                </BoardSelect.SingleCardContainer>
            ))}

            {boards.length < 10 && 
                <BoardSelect.SingleCardContainer>
                    <BoardSelect.Card onClick={handleActive}>

                        <BoardSelect.Title isActive={isInputActive}>Add new</BoardSelect.Title>
                        <BoardSelect.Input 
                            ref={inputRef}
                            isActive={isInputActive} 
                            placeholder="Start typing..."
                            value={newBoardTitle} 
                            onBlur={handleCreateNew}
                            onChange={e => setNewBoardTitle(e.target.value)}
                        ></BoardSelect.Input>
                    </BoardSelect.Card>
                    
                    <BoardSelect.Button 
                        ref={btnRef}
                        isActive={isInputActive} 
                        onClick={handleCreateNew}
                    >Create</BoardSelect.Button>
                </BoardSelect.SingleCardContainer>
            }

            </BoardSelect.CardsContainer>
        </BoardSelect.Inner>
        
      </BoardSelect>
    )
}


