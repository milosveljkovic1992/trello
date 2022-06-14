import React from 'react';
import { LinkElement } from './styles/link';

const Link = ({ children, ...restProps }) => {
    return <LinkElement {...restProps}>{children}</LinkElement>
}

export default Link;