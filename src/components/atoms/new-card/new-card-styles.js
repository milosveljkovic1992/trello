import styled from "styled-components/macro";
import { Container as DefaultContainer} from '../../molecules/single-card/single-card-styles';

export const Container = styled.div``;

export const InputContainer = styled(DefaultContainer)`
    height: auto;
`;

export const InputBox = styled.textarea`
    width: 100%;
    border: none;
    height: auto;
    min-height: 60px;
    max-height: 160px;
    resize: vertical;
    margin-bottom: -3px;
    padding: 5px 5px 0;

    &:focus {
        outline: none;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const Button = styled.button`
    color: #fff;
    background-color: ${({theme}) => theme.background.primary};
    border: none;
    box-shadow: none;
    padding: 6px 12px;
    cursor: pointer;
    transition: .135s;

    &:focus,
    &:hover {
        background-color: ${({ theme }) => theme.background.primaryHover }
    }
`;

export const IconContainer = styled.div`
    padding: 6px;
    display: flex;
    align-items: center;
    border-radius: ${({ theme }) => theme.border.borderRadius};
    cursor: pointer;

    &:focus,
    &:hover {
        background-color: ${({ theme }) => theme.background.grayHover}
    }
`;