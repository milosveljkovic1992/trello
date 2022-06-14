import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 272px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    background-color: ${({theme}) => theme.background.gray};
    padding: 10px;
    border-radius: ${({ theme }) => theme.border.borderRadius};
`;

export const Heading = styled.div`
    margin: 0 0 5px;
`;

export const Title = styled.textarea`
    font-family: ${({theme}) => theme.font.fontFamily};
    font-size: 16px;
    font-weight: 600;

    height: 32px;
    width: 100%;
    margin: 0;
    padding: 5px 5px;

    color: ${({theme}) => theme.font.color};
    background-color: transparent;
    border: 0;
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;

    &:focus {
        background-color: #fff;
    }
`;
