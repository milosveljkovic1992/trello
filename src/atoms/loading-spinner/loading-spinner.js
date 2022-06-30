import React from 'react';
import { Container,
    Bigger,
    Smaller,
    Smallest } from './loading-spinner-styles';

const LoadingSpinner = () => {
    return (
        <Container>
            <Bigger>
                <Smaller>
                    <Smallest />
                </Smaller>
            </Bigger>
        </Container>
    )
};

export default LoadingSpinner;