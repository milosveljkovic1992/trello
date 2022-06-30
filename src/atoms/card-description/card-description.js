import React from 'react'; 
import { Container } from './card-description-styles';

const CardDescription = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

export default CardDescription;