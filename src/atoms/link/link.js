import React from 'react';
import { LinkElement } from './link-styles';

const Link = ({ children, ...restProps }) => {
    return <LinkElement {...restProps}>{children}</LinkElement>
}

export default Link;