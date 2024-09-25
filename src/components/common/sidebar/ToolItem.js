import React from 'react'
import styled from 'styled-components';

const ToolBox = styled.div`
    width: 50px;
    height: 50px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: var(--light-gray-color);
    cursor: pointer;
    svg {
        font-size: 28px;
    }

    &.day {
        svg {
            color: var(--warning-color);
        }
    }
`;

const ToolItem = ({name, iconCode}) => {
  return (
    <ToolBox className={name}>{iconCode}</ToolBox>
  )
}

export default ToolItem
