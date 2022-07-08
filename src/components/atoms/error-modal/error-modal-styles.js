import styled from 'styled-components/macro';

export const Snackbar = styled.div`
  position: fixed;
  top: 5px;
  left: calc(50% - 150px);
  width: 300px;

  text-align: center;
  padding: 5px 10px;
  background-color: rgba(215, 0, 0, 0.6);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;

  z-index: 3;

  p {
    font-size: 18px;
    line-height: 2rem;
    color: #fff;
    user-select: none;
    word-break: break-word;
  }
`;
