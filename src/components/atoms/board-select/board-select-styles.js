import styled from 'styled-components/macro';
import { Button as DefaultButton } from '../card-edit/card-edit-styles';


export const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Inner = styled.div`
    min-height: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Heading = styled.div`
    min-height: 50px;
`;

export const HeadingText = styled.h2`
    font-size: 21px;
    text-transform: uppercase;
    user-select: none;
`;

export const CardsContainer = styled.div`
    max-width: 830px;
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`;

export const SingleCardContainer = styled.div`
    position: relative;
    overflow: visible;
    background-image: ${({ backgroundImage }) => backgroundImage && backgroundImage};
    background-color: #c7c7c7;
    background-size: cover;
    border-radius: 3px;
`;

export const Card = styled.div`
    width: 150px;
    height: 100px;
    position: relative;
    background-color: transparent;
    padding: 8px 12px;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    transition: .135s;

    &:focus,
    &:hover {
        background-color: rgba(255, 255, 255, .25);

        .delete-btn {
            display: flex;
        }
    }
`;

export const Title = styled.h3`
    display: ${({ isActive }) => isActive && 'none'};
    word-break: break-word;
    text-overflow: ellipsis;
    padding-top: 2px;
    user-select: none;
`;

export const Input = styled.textarea`
    display: ${({ isActive }) => !isActive && 'none'};
    width: 100%;
    height: 100%;
    font-weight: 600;
    word-break: break-word;
    
    background-color: transparent;
    padding: 2px 2px 2px 0;
    border: none;
    border-radius: 3px;
    
    resize: none;

    &:focus {
        outline: none;
    }

    ::placeholder {
        color: #172b4d;
        font-weight: 700;
    }
`;

export const Button = styled.button`
    display: ${({ isActive }) => !isActive && 'none'};
    height: 35px;
    position: absolute;
    bottom: -50px;
    left: 0;

    color: #fff;
    background-color: ${({theme}) => theme.background.primary};
    border: none;
    box-shadow: none;
    padding: 8px 16px;
    border-radius: 3px;
    cursor: pointer;
    transition: .135s;
    transform: translateY(-20px);

    &:focus,
    &:hover {
        background-color: ${({ theme }) => theme.background.primaryHover }
    };

    &.slide-in-top {
        transform: translateY(0);
    };
`;

export const Delete = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    height: 20px;
    width: 20px;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 2px;

    &:focus,
    &:hover {
        background-color: #c7c7c7;
    }
`;

export const Logout = styled.button`
    height: 33px;
    width: 100px;
    color: ${({ fixed }) => fixed ? "#333" : "#fff"};
    font-weight: 600;
    background-color: rgba(255, 255, 255, .3);
    border: ${({ fixed }) => fixed ? '2px solid #333' : '2px solid rgba(255, 255, 255, 1)'};
    cursor: pointer;

    position: fixed;
    top: 20px;
    right: 20px;

    &:focus,
    &:hover {
        color: #333;
        background-color: rgba(255, 255, 255, .6);
        border-color: rgba(225, 0, 0, 1);
    };
`;