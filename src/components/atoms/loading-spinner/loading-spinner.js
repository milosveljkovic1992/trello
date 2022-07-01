import React from 'react';
import { Container,
    Bigger,
    Smaller,
    Smallest } from './loading-spinner-styles';

export const LoadingSpinner = () => {
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