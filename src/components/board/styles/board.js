import styled from 'styled-components/macro';

export const Container = styled.div`
    min-height: 100vh;
    background-image: ${({ backgroundImage}) => backgroundImage && `url("${backgroundImage}")`};
    background-size: cover;
    background-position: center;
`;

export const Header = styled.header`
    min-height: 5vh;
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
        padding: 0 30px;
        justify-content: flex-start;
    }
`;

export const Title = styled.h1`
    font-size: 21px;
    line-height: 1;
    font-weight: bold;
    color: #fff;
    
    padding: 5px 10px;
    border: 1px solid transparent;
    border-left-width: 2px;
    border-right-width: 2px;
    border-radius: 3px;
    cursor: pointer;
    user-select: none;

    &:focus,
    &:hover {
        background-color: rgba(175, 175, 175, .5);
    }
    display: ${({ isActive }) => isActive ? 'none' : 'block'};
`;

export const TitleInput = styled.input`
    font-size: 21px;
    line-height: 1;
    font-weight: bold;
    color: #fff;
    width: auto;

    padding: 0 10px;
    background-color: #c7c7c7;
    border: 2px solid transparent;
    border-radius: 3px;
    
    cursor: pointer;
    outline: none;

    &:focus,
    &:hover {
        background-color: #c7c7c7;
    }
    &:focus {
        border: 2px solid #fff;
    }
    display: ${({ isActive }) => isActive ? 'block' : 'none'};
`;

export const Inner = styled.div`
    height: 100%;
    min-height: 95vh;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    overflow-x: auto;
    
    padding: 0 15px;
`;