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