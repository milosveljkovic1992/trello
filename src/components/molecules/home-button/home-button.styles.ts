import styled from 'styled-components/macro';

export const IconContainer = styled.div`
  height: 33px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;

  & > * {
    font-size: 21px;

    & > path {
      color: #fff;
    }
  }

  &:focus,
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;
