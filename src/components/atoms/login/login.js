import React from 'react';
import { Container } from './login-styles';

export const Login = ({ APIkey }) => {
    return (
        <Container>
            <h1>Click here to</h1>
            <a href={`https://trello.com/1/authorize?return_url=http://localhost:3000&expiration=1day&name=MyPersonalToken&scope=read,write&response_type=token&key=${APIkey}`}>Login</a>
        </Container>
    )
};