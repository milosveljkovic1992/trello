import styled from 'styled-components';

interface Props {
  isHomePage: boolean;
}

export const Button = styled.button<Props>`
  height: 33px;
  width: 100px;
  color: ${({ isHomePage }) => (isHomePage ? '#333' : '#fff')};
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.3);
  border: ${({ isHomePage }) =>
    isHomePage ? '2px solid #333' : '2px solid rgba(255, 255, 255, 1)'};
  cursor: pointer;

  &:focus,
  &:hover {
    color: #333;
    background-color: rgba(255, 255, 255, 0.6);
    border-color: rgba(225, 0, 0, 1);
  }
`;
