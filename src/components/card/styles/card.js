import styled from 'styled-components/macro';
import { Delete as DeleteButton } from '../../board-list/styles/board-list';

export const Container = styled.div`
    position: relative;
    margin: 0 0 8px;
    background-color: #fff;
    border-radius: ${({ theme }) => theme.border.borderRadius};
    box-shadow: 0 1px #bbb;

    user-select: none;
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

export const Delete = styled(DeleteButton)`
    height: 29px;
    width: 29px;
    border-width: 1px;

    & > * {
        font-size: 16px;
    }
`;