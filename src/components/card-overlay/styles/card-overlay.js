import styled from 'styled-components/macro';

export const Overlay = styled.div`
    height: 100%;
    min-height: 100vh;
    width: 100%;
    position: fixed;

    display: flex;
    align-items: flex-start;
    justify-content: center;


    background-color: rgba(0, 0, 0, .65);
    overflow-y: auto;
    z-index: 2;
`;

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    min-height: 80vh;
    max-width: 768px;

    padding-bottom: 40px;
    margin: 36px 8px;
    background-color: ${({ theme }) => theme.background.gray};
    border-radius: ${({ theme }) => theme.border.borderRadius};

    @media (min-width: 768px) {
        margin: 50px 0 100px;
        width: 100%;
    };

`;

export const CardHeader = styled.div`
    position: relative;
    margin: 12px 40px 60px 56px;
    padding-top: 12px;
    min-height: 32px;
`;

export const CardTitle = styled.h2`
    font-size: 20px;
    line-height: 1.2;
    color: #172b4d;
    font-weight: 600;
`;

export const CardContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
        padding-right: 0;
    }
`;

export const Main = styled.div`
    width: auto;

    @media (min-width: 768px) {
        width: 552px;
    }
`;

export const Sidebar = styled.div`
    width: calc(100% - 570px);
        padding-left: 20px;
    @media (min-width: 768px) {
        padding-left: 0;
    }
`;

export const Section = styled.div`
    
`;

export const SectionHeader = styled.div`
    margin: 12px 40px 12px 56px;
    position: relative;
`;

export const Icon = styled.div`
    height: 32px;
    width: 32px;
    position: absolute;
    left: -40px;
    
    & > svg {
        font-size: 24px;
        color: #777;

        & > path {
            color: #42526e;
        }
    }
`;

export const SectionTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    padding-top: 2px;
`;

export const TitleInfo = styled.p``;

export const SectionDetails = styled.div`
    min-height: 40px;
    margin: 12px 0 12px 56px;
    position: relative;
`;

export const DescriptionBox = styled.textarea`
    width: 100%;
    border: none;
    background-color: #091e420a;
    min-height: 60px;
    border-radius: 3px;
    padding: 5px 10px;
`;

export const CommentSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    position: relative;
`;

export const UserIcon = styled.div`
    position: absolute;
    left: -40px;
    top: 0;
    height: 32px;
    width: 32px;
    background-color: #ccc;
    border: 1px solid #777;
    border-radius: 50%;
`;

export const CommentBox = styled.textarea`
    
`;

export const CloseButton = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: .135s;

    &:focus,
    &:hover {
        background-color: rgba(9, 30, 66, 0.08);
    }
`;