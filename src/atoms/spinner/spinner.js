import React from 'react';
import { Container,
    Bigger,
    Smaller,
    Smallest } from './spinner-styles';

const Spinner = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

Spinner.Bigger = ({ children, ...restProps }) => {
    return <Bigger {...restProps}>{children}</Bigger>
};

Spinner.Smaller = ({ children, ...restProps }) => {
    return <Smaller {...restProps}>{children}</Smaller>
};

Spinner.Smallest = ({ children, ...restProps }) => {
    return <Smallest {...restProps}>{children}</Smallest>
};


export default Spinner;