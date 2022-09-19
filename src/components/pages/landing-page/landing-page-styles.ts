import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

export const Container = styled.div<ThemeProps>`
  min-height: 95vh;
  width: 100%;
  display: flex;
  justify-content: center;

  .inner-container {
    min-height: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
  }

  .landing-heading {
    min-height: 50px;
  }

  h2 {
    font-size: 21px;
    text-transform: uppercase;
    user-select: none;
  }

  .boards-container {
    max-width: 830px;
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
`;
