import styled from 'styled-components/macro';

export const Tab = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  color: #fff;
  padding: 6px 12px 6px 8px;
  margin-bottom: 4px;
  border-radius: 3px;
  background-color: #0009;

  cursor: pointer;
  transition: 0.135s ease-in-out;

  &:focus,
  &:hover {
    background-color: #000c;
    transform: translateX(5px);
  }

  .edit-options-icon-container {
    display: flex;
    align-items: center;
    margin-right: 5px;

    & > svg {
      font-size: 14px;
    }
    & > svg > path {
      color: #fff;
    }
  }
`;
