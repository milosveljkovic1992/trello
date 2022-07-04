import React from 'react';
import { Container } from './loading-spinner-styles';

export const LoadingSpinner = () => {
    return (
        <Container>
            <div className="spinner-circle bigger">
                <div className="spinner-circle smaller">
                    <div className="spinner-circle smallest"></div>
                </div>
            </div>
        </Container>
    )
};