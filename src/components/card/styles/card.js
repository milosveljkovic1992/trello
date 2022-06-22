import styled from 'styled-components/macro';
import { Delete as DeleteButton } from '../../board-list/styles/board-list';

export const Container = styled.div`
    position: relative;
    width: 252px;
    min-height: 29px;
    margin: 0 0 8px;
    background-color: #fff;
    border-radius: ${({ theme }) => theme.border.borderRadius};
    box-shadow: 0 1px #bbb;

    user-select: none;

    &:hover > .edit-btn,
    &:focus > .edit-btn {
        display: flex;
    }

    .placeholder {
        position: absolute;
        background-color: #ddd;
        border-radius: ${({ theme }) => theme.border.borderRadius};

        
    }
`;

export const Title = styled.p`
    width: calc(100% - 29px);
    padding: 5px 8px;
    cursor: pointer;

    &:focus,
    &:hover {
        background-color: #f4f5f7;
    }
`;

export const Edit = styled(DeleteButton)`
    display: none;
    height: 29px;
    width: 29px;
    border-width: 0;
    border-radius: 0 3px 3px 0;

    & > * {
        font-size: 16px;
    }
`;

export const Placeholder = styled.div`
    
`;
