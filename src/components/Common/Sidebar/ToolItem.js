import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "styled-components";

const ToolBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: var(--light-gray-color);
  cursor: pointer;
  svg {
    font-size: 24px;
  }

  &.day {
    svg {
      color: var(--warning-color);
    }
  }

  &.heartFill {
    svg {
      color: var(--sub-pink-color);
    }
  }
`;

const ToolItem = ({ name, iconCode, onClick }) => {
  const goDark = useContext(ThemeContext);
  return (
    <ToolBox onClick={onClick} className={name}>
      {iconCode}
    </ToolBox>
  );
};

export default ToolItem;
