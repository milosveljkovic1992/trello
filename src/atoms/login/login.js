import React from 'react';
import { Container, Text, Button } from './login-styles';

const Login = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

Login.Text = ({ children, ...restProps }) => {
    return <Text {...restProps}>{children}</Text>
}

Login.Button = ({ children, ...restProps }) => {
    return <Button {...restProps}>{children}</Button>
};


export default Login;