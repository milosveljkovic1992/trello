import styled from "styled-components";

export const Container = styled.div``;

export const Title = styled.h2`
    display: ${({ isActive }) => isActive ? 'none' : 'block'};
    font-size: 20px;
    line-height: 1.2;
    font-weight: 600;
    color: #172b4d;
    padding: 0 4px 5px;
`;

export const Input = styled.input`
    display: ${({ isActive }) => isActive ? 'block' : 'none'};
    font-size: 20px;
    line-height: 1.2;
    font-weight: 600;
    color: #172b4d;
    padding: 2px 3px;
    border-radius: 3px;
    border: 2px solid transparent;
    width: 100%;
    margin-top: -3px;

    &:focus {
        border: 2px solid #0079bf;
        outline: none;
    }
`;

export const Subheading = styled.p``;