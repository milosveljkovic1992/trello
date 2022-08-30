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
    padding: 5px 29px 5px 8px;

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

  .badge-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 1;

    margin: 0 10px 5px 0;

    .badge-icon {
      margin-right: 3px;
    }
  }
`;
