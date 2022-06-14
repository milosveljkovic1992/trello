import styled from 'styled-components/macro';

export const Container = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    font-weight: 600;
    color: #777;

    padding: 7px 5px;
    border: none;
    border-radius: ${({ theme }) => theme.border.borderRadius};
    user-select: none;
    cursor: pointer;

    &:focus,
    &:hover {
        background-color: ${({ theme }) => theme.background.grayHover}
    }
`;

export const IconContainer = styled.span`
    font-size: 16px;
    display: flex;
    margin-right: 3px;
`;

export const BtnText = styled.span`
    color: ${({theme}) => theme.font.lightColor};
`;