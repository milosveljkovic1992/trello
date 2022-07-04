import styled from 'styled-components/macro';

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 40px;
        color: #0079bf;
        margin-bottom: 15px;
    }

    a {
        font-size: 21px;
        font-weight: 600;
        text-decoration: none;
        color: #fff;
        padding: .5em 1em;
        background-color: #0079bf;
        border: 2px solid #0079bf;
        border-radius: 3px;
        cursor: pointer;
        transition: .085s;
    
        &:hover,
        &:focus {
            color: #0079bf;
            background-color: #fff;
        }
    }
`;