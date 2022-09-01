import { ThemeProps } from 'global/Theme';
import styled from 'styled-components/macro';

export const Container = styled.div<ThemeProps>`
  width: 252px;
  min-height: 29px;
  height: 59px;
  margin: 0 0 8px;
  background-color: #fff;
  border-radius: ${({ theme }: { theme: ThemeProps }) =>
    theme.border.borderRadius};
  box-shadow: 0 1px #bbb;

  .card-content-box {
    height: 59px;
    padding: 5px 29px 5px 8px;
    cursor: pointer;

    p {
      margin: 2px 0;
    }
  }

  .badges {
    margin-top: 8px;
    display: flex;
    flex-direction: row;

    svg > path {
      color: #6b778c;
    }
  }
`;
