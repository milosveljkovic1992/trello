import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

interface Props {
  children: ReactNode;
}

export type MyThemeProps = {
  background: {
    primary: string;
    primaryHover: string;
    gray: string;
    grayHover: string;
  };
  font: {
    color: string;
    lightColor: string;
    fontFamily: string;
    fontSize: string;
    code: string;
  };
  border: {
    borderRadius: string;
  };
  children: ReactNode;
};

const theme = {
  background: {
    primary: '#0079bf',
    primaryHover: '#026aa7',
    gray: '#ebecf0',
    grayHover: '#ddd',
  },
  font: {
    color: '#172b4d',
    lightColor: '#777',
    fontSize: '14px',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    code: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  border: {
    borderRadius: '3px',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-size: ${theme.font.fontSize};
    color: ${theme.font.color};
    font-family: ${theme.font.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: ${theme.font.code};
  }

  button {
    border-radius: ${theme.border.borderRadius};
  }
`;

export type ThemeProps = MyThemeProps & Record<string, unknown>;

const Theme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
