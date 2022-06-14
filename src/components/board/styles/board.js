import styled from 'styled-components/macro';

export const Container = styled.div`
    min-height: 100vh;
    background-color: blue;
`;

export const Header = styled.header`
    min-height: 5vh;
    background-color: red;
    width: 100%;
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