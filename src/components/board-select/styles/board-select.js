import styled from 'styled-components/macro';
import { Button as DefaultButton } from '../../card-edit/styles/card-edit';

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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`;

export const SingleCardContainer = styled.div`
    position: relative;
    overflow: visible;
`;

export const Card = styled.div`
    width: 150px;
    height: 100px;
    position: relative;
    background-color: gray;
    padding: 8px 12px;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    opacity: .9;
    transition: .135s;

    &:focus,
    &:hover {
        opacity: 1;

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

export const Button = styled(DefaultButton)`
    display: ${({ isActive }) => !isActive && 'none'};

    height: 35px;
    transform: translateY(-20px);
    transition: transform .135s;

    &.slide-in-top {
        transform: translateY(0);
    }
    position: absolute;
    bottom: -50px;
    left: 0;

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