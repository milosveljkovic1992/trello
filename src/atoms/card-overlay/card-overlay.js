import React from 'react';
import { Overlay,
    Container,
    CardHeader,
    CardContent,
    Main,
    Sidebar,
    Section,
    SectionHeader,
    Icon,
    SectionDetails,
    CardTitle,
    TitleInfo,
    SectionTitle,
    DescriptionBox,
    CommentSection,
    UserIcon,
    CommentBox,
    CloseButton } from './card-overlay-styles';

const CardOverlay = ({ children, ...restProps }) => {
    return <Overlay {...restProps}>{children}</Overlay>
};

CardOverlay.Container = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

CardOverlay.CardHeader = ({ children, ...restProps }) => {
    return <CardHeader {...restProps}>{children}</CardHeader>
};

CardOverlay.CardContent = ({ children, ...restProps }) => {
    return <CardContent {...restProps}>{children}</CardContent>
};

CardOverlay.Main = ({ children, ...restProps }) => {
    return <Main {...restProps}>{children}</Main>
};

CardOverlay.Sidebar = ({ children, ...restProps }) => {
    return <Sidebar {...restProps}>{children}</Sidebar>
};

CardOverlay.Section = ({ children, ...restProps }) => {
    return <Section {...restProps}>{children}</Section>
};

CardOverlay.SectionHeader = ({ children, ...restProps }) => {
    return <SectionHeader {...restProps}>{children}</SectionHeader>
};

CardOverlay.Icon = ({ children, ...restProps }) => {
    return <Icon {...restProps}>{children}</Icon>
};

CardOverlay.SectionDetails = ({ children, ...restProps }) => {
    return <SectionDetails {...restProps}>{children}</SectionDetails>
};

CardOverlay.CardTitle = ({ children, ...restProps }) => {
    return <CardTitle {...restProps}>{children}</CardTitle>
};

CardOverlay.TitleInfo = ({ children, ...restProps }) => {
    return <TitleInfo {...restProps}>{children}</TitleInfo>
};

CardOverlay.SectionTitle = ({ children, ...restProps }) => {
    return <SectionTitle {...restProps}>{children}</SectionTitle>
};

CardOverlay.DescriptionBox = ({ children, ...restProps }) => {
    return <DescriptionBox {...restProps}>{children}</DescriptionBox>
};

CardOverlay.CommentSection = ({ children, ...restProps }) => {
    return <CommentSection {...restProps}>{children}</CommentSection>
};

CardOverlay.UserIcon = ({ children, ...restProps }) => {
    return <UserIcon {...restProps}>{children}</UserIcon>
};

CardOverlay.CommentBox = ({ ...restProps }) => {
    return <CommentBox {...restProps}></CommentBox>
};

CardOverlay.CloseButton = ({ children, ...restProps }) => {
    return <CloseButton {...restProps}>{children}</CloseButton>
};



export default CardOverlay;