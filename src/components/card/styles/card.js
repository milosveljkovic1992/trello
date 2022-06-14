import styled from 'styled-components/macro';

export const Container = styled.div`
    margin: 0 0 8px;

    background-color: #fff;
    border-radius: ${({ theme }) => theme.border.borderRadius};
    box-shadow: 0 1px #bbb;

    user-select: none;
    
    &:focus,
    &:hover {
        background-color: #f4f5f7;
    }

`;

export const Title = styled.p`
    padding: 5px 8px;
    cursor: pointer;

`;