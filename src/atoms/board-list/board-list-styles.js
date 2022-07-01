import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 272px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    max-height: 85vh;

    background-color: ${({theme}) => theme.background.gray};
    padding: 10px;
    border-radius: ${({ theme }) => theme.border.borderRadius};
`;

export const CardContainer = styled.div`
    height: 100%;
    overflow-y: auto;
    
    ::-webkit-scrollbar {
        padding-left: 5px;
        height: 8px;
        width: 8px;
    }
    ::-webkit-scrollbar-track-piece {
        background: rgba(9, 30, 66, 0.08);
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(9, 30, 66, 0.2);
        border-radius: 50px;
    }
`;

export const Actions = styled.div`
    display: none;
    align-items: center;
    justify-content: center;

    position: absolute;
    height: 32px;
    width: 32px;
    right: 0;
    top: 0;
 
    background-color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    & > * {
        font-size: 16px;
    };

    &:focus,
    &:hover {
        background-color: #e7e7e7;
        border: 2px solid #e7e7e7;
    }
`;