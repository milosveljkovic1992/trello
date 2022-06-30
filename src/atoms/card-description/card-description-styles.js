import styled from 'styled-components/macro'; 

export const Container = styled.div`
    background-color: rgba(9, 30, 66, 0.04);
    min-height: ${({ hasDescription}) => !hasDescription && '70px'};
    position: relative;
    border-radius: 3px;
    padding-bottom: ${({ isActive }) => isActive ? '50px' : 0};
    background-color: ${({ hasDescription, isActive }) => isActive || hasDescription ? 'rgba(9, 30, 66, 0)' : 'rgba(9, 30, 66, 0.04)'};

    .btn-container {
        box-shadow: none;
        position: relative;
        display: flex;
        gap: 10px;

        button {
            background-color: #0079bf;
            color: #fff;
            border: none;
            padding: 6px 12px;
        
            transition: .1s;

            cursor: pointer;

            &:focus,
            &:hover {
                background-color: #026aa7;
            }

            &:disabled {
                color: #a5adba;
                background-color: rgba(9, 30, 66, 0.04);
                cursor: not-allowed;
            }
        }
    }
    
    .desc-content {
        padding: 8px 12px;
        display: ${({ isActive }) => isActive ? 'none' : 'block'};
        cursor: pointer;
        padding-left: ${({ hasDescription}) => hasDescription && 0};
    }

    .desc-input {
        display: ${({ isActive }) => isActive ? 'block' : 'none'};
        min-height: 70px;
        border-radius: 3px;
        width: 100%;
        padding: 8px 12px;
        resize: none;
        border: none;
        
        &:focus {
            outline: 1px solid #c7c7c7;
        }
    }

    .icon-container {
        position: absolute;
        left: 0;
        bottom: 6px;

        opacity: ${({ isActive }) => isActive ? 1 : 0};
        visibility: ${({ isActive }) => isActive ? 'visible' : 'hidden'};
    }
`;