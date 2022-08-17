import styled, { StyledComponent } from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

export const Button: StyledComponent<
  'button',
  Record<string, unknown>,
  Record<string, unknown>,
  never
> = styled.button<ThemeProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  font-weight: 600;
  color: #777;

  padding: 7px 5px;
  border: none;
  border-radius: ${({ theme }: { theme: ThemeProps }) =>
    theme.border.borderRadius};
  user-select: none;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: ${({ theme }: { theme: ThemeProps }) =>
      theme.background.grayHover};
  }

  span {
    display: flex;
    align-items: center;
    color: ${({ theme }: { theme: ThemeProps }) => theme.font.lightColor};
    padding-right: 3px;
  }
`;
