import React from 'react';
import { ThemeProvider } from 'styled-components';

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

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
