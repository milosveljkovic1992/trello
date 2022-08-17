import styled, { StyledComponent } from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

export const Container: StyledComponent<
  'div',
  Record<string, unknown>,
  Record<string, unknown>,
  never
> = styled.div<ThemeProps>`
  width: 272px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  max-height: 85vh;

  background-color: ${({ theme }: { theme: ThemeProps }) =>
    theme.background.gray};
  padding: 10px;
  border-radius: ${({ theme }: { theme: ThemeProps }) =>
    theme.border.borderRadius};
`;
