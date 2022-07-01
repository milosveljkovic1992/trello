import React from 'react';
import { Overlay } from './card-overlay-styles';

const CardOverlay = ({ children, ...restProps }) => {
    return <Overlay {...restProps}>{children}</Overlay>
};

export default CardOverlay;