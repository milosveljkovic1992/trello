import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

interface Props {
  children: ReactNode;
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-size: 14px;
    color: #172b4d;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    border-radius: 3px;
  }
`;

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
  };
  border: {
    borderRadius: string;
  };
  children: ReactNode;
};

export type ThemeProps = MyThemeProps & Record<string, unknown>;

const theme = {
  background: {
    primary: '#0079bf',
    primaryHover: '#026aa7',
    gray: '#ebecf0',
    grayHover: '#ddd',
  },
  font: {
    color: '#333',
    lightColor: '#777',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  },
  border: {
    borderRadius: '3px',
  },
};

const Theme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
