import styled from 'styled-components/macro';

export const Container = styled.div`
    min-height: 100vh;
    background-image: ${({ backgroundImage}) => backgroundImage && `url("${backgroundImage}")`};
    background-size: cover;
    background-position: center;

    .board-header {
        min-height: 5vh;
        width: 100%;
        padding: 20px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, .25), transparent);

        @media (min-width: 768px) {
            padding: 0 15px;
            justify-content: flex-start;
        };
    };

    .board-icon-container {
        height: 33px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        background-color: rgba(255, 255, 255, .3);
        cursor: pointer;

        & > * {
            font-size: 21px;

            & > path {
                color: #fff;
            };
        };

        &:focus,
        &:hover {
            background-color: rgba(255, 255, 255, .6);
        };
    };

    .board-title-container {
        width: calc(100% - 150px);
        height: 33px;
        margin-left: 8px;
        margin-right: 8px;
        display: flex;
        justify-content: center;

        @media (min-width: 768px) {
            justify-content: flex-start;
        };
    };

    .board-title {
        font-size: 21px;
        line-height: 1;
        font-weight: bold;
        color: #fff;
        width: fit-content;
        
        padding: 5px 10px;
        border: 1px solid transparent;
        border-left-width: 2px;
        border-right-width: 2px;
        border-radius: 3px;
        cursor: pointer;
        user-select: none;

        &:focus,
        &:hover {
            background-color: rgba(175, 175, 175, .5);
        };
        display: ${({ isActive }) => isActive ? 'none' : 'block'};
    };

    .board-title-input {
        font-size: 21px;
        line-height: 1;
        text-align: center;
        font-weight: bold;
        color: #fff;
        width: 100%;
        min-width: 300px;

        padding: 0 10px;
        background-color: #c7c7c7;
        border: 2px solid transparent;
        border-radius: 3px;
        
        cursor: pointer;
        outline: none;

        &:focus,
        &:hover {
            background-color: #c7c7c7;
        };

        &:focus {
            border: 2px solid #fff;
        };

        display: ${({ isActive }) => isActive ? 'block' : 'none'};

        @media (min-width: 768px) {
            width: auto;
            text-align: left;
        };
    };

    .board-inner-container {
        height: 100%;
        min-height: 95vh;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 8px;
        overflow-x: auto;
        
        padding: 0 15px;
    };

    .board-button {
        height: 33px;
        width: 100px;
        color: ${({ fixed }) => fixed ? "#333" : "#fff"};
        font-weight: 600;
        background-color: rgba(255, 255, 255, .3);
        border: ${({ fixed }) => fixed ? '2px solid #333' : '2px solid rgba(255, 255, 255, 1)'};
        cursor: pointer;

        position: ${({ fixed }) => fixed && 'fixed'};
        top: ${({ fixed }) => fixed && '20px'};
        right: ${({ fixed }) => fixed && '20px'};

        &:focus,
        &:hover {
            color: #333;
            background-color: rgba(255, 255, 255, .6);
            border-color: rgba(225, 0, 0, 1);
        };
    };
`;