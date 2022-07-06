import styled from 'styled-components/macro';

export const Container = styled.div`
  h2 {
    display: ${({ isActive }) => (isActive ? 'none' : 'block')};
    font-size: 20px;
    line-height: 1.2;
    font-weight: 600;
    color: #172b4d;
    padding: 0 4px 5px;
  }

  input {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
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
  }
`;
