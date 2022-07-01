import React from 'react';
import { Container,
    Bigger,
    Smaller,
    Smallest } from 'components/atoms/loading-spinner/loading-spinner-styles';

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