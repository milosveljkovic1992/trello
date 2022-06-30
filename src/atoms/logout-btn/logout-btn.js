import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Board } from '..';
import { logout } from '../../store/auth';



export const LogoutBtn = ({ fixed }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('trelloToken');
        dispatch(logout());
        navigate('/');
    }

    return <Board.Button onClick={handleLogout} fixed={fixed}>Log Out</Board.Button>
}