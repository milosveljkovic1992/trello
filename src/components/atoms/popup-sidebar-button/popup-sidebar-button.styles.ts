import styled from 'styled-components/macro';

export const Button = styled.button`
  background-color: #091e420a;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;

  padding: 7px 10px;
  margin-top: 5px;
  border: none;
  cursor: pointer;
  transition: 0.15s;

  svg {
    margin-top: 2px;
  }

  &:focus,
  &:hover {
    background-color: #091e4214;
  }
`;
