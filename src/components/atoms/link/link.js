import React from 'react';
import { LinkElement } from 'components/atoms/link/link-styles';

export const Link = ({ children, ...restProps }) => {
    return <LinkElement {...restProps}>{children}</LinkElement>
};