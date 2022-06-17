import styled from 'styled-components/macro';

export const Container = styled.div`
    position: fixed;
    top: ${({ rect, position }) => position === 'left' ? `${rect.y + 35}px` : `${rect.y + 170}px`};
    left: ${({ rect, position }) => position === 'left' ? `${rect.x - 5}px` : 'initial'};
    right: ${({ rect, position }) => position === 'right' ? `10px` : 'initial'};
    width: ${({ rect, position }) => position === 'left' ? `300px` : 'calc(100% - 20px)'};
    padding: 0 12px 12px;
    background-color: white;
    border-radius: 3px;

    z-index: 4;
`;

export const Title = styled.h3`
    position: relative;
    display: block;
    text-align: center;
    font-weight: 400;
    line-height: 40px;
    text-overflow: ellipsis;
    color: #5e6c84;
    margin: 0 12px;
    border-bottom: 1px solid rgba(9, 30, 66, 0.13);
    overflow: hidden;
    white-space: nowrap;
`;

export const Subtitle = styled.h4`
    font-size: 0.875rem;
    font-weight: 600;
    color: #5e6c84;
    
    margin: 12px 0 6px;
`;

export const OptionsContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const DroplistContainer = styled.div`
    position: relative;
    padding: 6px 10px 10px;
    background-color: rgba(9, 30, 66, 0.06);
    border-radius: 3px;
    height: 50px;

    &.list-dropdown {
        flex: 3;
    }

    &.position-dropdown {
        flex: 1;
    }
`;

export const Label = styled.label`
    margin-top: -5px;
`;

export const Dropdown = styled.select`
    position: absolute;
    top: 0; right: 0; left: 0;
    border: 0;
    padding-top: 27px;
    padding-left: 10px;
    border-radius: 3px;
    background: transparent;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &::-ms-expand {
        display: none;
    }

    &:focus {
        outline: none;
    };
`;

export const Option = styled.option``;

export const IconContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 5px;
    right: 5px;
    height: 30px;
    width: 30px;
    cursor: pointer;

    & > svg > path {
        stroke: #6b778c;
        transition: .135s;
    }

    &:focus > svg > path,
    &:hover > svg > path {
        stroke: #000;
    }
`;