import React from 'react';
import { Spinner } from "../components";

export const LoadingSpinner = () => {
    return (
        <Spinner>
            <Spinner.Bigger>
                <Spinner.Smaller>
                    <Spinner.Smallest />
                </Spinner.Smaller>
            </Spinner.Bigger>
        </Spinner>
    )
}