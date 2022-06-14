import styled from 'styled-components/macro';

export const Container = styled.div`
    min-height: 95vh;
    background-color: blue;
`;

export const Header = styled.header`
    min-height: 5vh;
    background-color: red;
`;

export const Inner = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    
    margin: 0 15px;
`;