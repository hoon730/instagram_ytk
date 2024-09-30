import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../App";

const ToolBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.iconBgColor};
  cursor: pointer;

  svg {
    font-size: 24px;
    color: ${({ theme }) => theme.iconColor};
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

const ToolItem = ({ name, iconCode }) => {
  const { changeDark } = useContext(ThemeContext);

  const onClick = (e) => {
    console.log(e.target.className);
    changeDark();
  };
  return (
    <ToolBox onClick={onClick} className={name}>
      {iconCode}
    </ToolBox>
  );
};

export default ToolItem;
