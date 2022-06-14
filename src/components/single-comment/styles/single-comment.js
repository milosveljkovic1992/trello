import styled from "styled-components/macro";

export const Container = styled.div`
    margin-top: 15px;
`;

export const Inner = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;

`;

export const Icon = styled.div`
    position: absolute;
    left: -40px;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 1px solid #777;
    background-color: #ccc;

`;

export const DetailsContainer = styled.div`
    width: 100%;
    border-radius: 3px;
`;

export const Name = styled.p`
    display: inline-block;
    font-weight: 700;
    margin-right: 10px;
`;

export const Timestamp = styled.p`
    display: inline-block;
    font-size: .875rem;
    color: ${({ theme }) => theme.font.lightColor};

`;

export const CommentTextContainer = styled.div`
    height: auto;
    padding: 8px 10px;
    margin-top: 5px;
    background-color: #fff;
    border: 1px solid #c7c7c7;
    border-radius: 3px;
`;

export const CommentText = styled.p`
    word-break: break-word;
`;

export const Actions = styled.div`
    padding: 2px 5px;
    cursor: default;
`;

export const ActionText = styled.p`
    font-size: .875rem;
    text-decoration: underline;
    display: inline-block;
    cursor: pointer;
    animation: .2s ease-in-out;

    &:hover,
    &:focus {
        text-decoration: none;
    }
`;