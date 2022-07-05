import styled from "styled-components/macro";

export const Container = styled.div`
    margin-top: 15px;
    word-break: break-word;

    .comment-avatar {
        position: absolute;
        left: -40px;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        border: 1px solid #777;
        background-color: #ccc;
    }

    .inner {
        position: relative;
        display: flex;
        flex-direction: row;
    }

    .details {
        width: 100%;
        border-radius: 3px;
    }

    .username {
        display: inline-block;
        font-weight: 700;
        margin-right: 10px;
    }

    .timestamp {
        display: inline-block;
        font-size: .875rem;
        color: ${({ theme }) => theme.font.lightColor};

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }

    .text-container {
        height: auto;
        padding: 8px 10px;
        margin-top: 5px;
        background-color: #fff;
        border: 1px solid #c7c7c7;
        border-radius: 3px;
    }

    .actions {
        padding: 2px 5px;
        cursor: default;

        p {
            font-size: .875rem;
            text-decoration: underline;
            display: inline-block;
            cursor: pointer;
            animation: .2s ease-in-out;

            &:hover,
            &:focus {
                text-decoration: none;
            }
        }
    }
`;