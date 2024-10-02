import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../App";
import Setting  from "./Setting";

const ToolBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.iconBgColor};
  cursor: pointer;
  position: relative;
  z-index: 0;

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

const ToolItem = ({ name, iconCode, id }) => {
  const [setting, setSetting] = useState(false);
  const { changeDark } = useContext(ThemeContext);

  const onClick = () => {
    if (id === 3) changeDark();
  };

  const toggleSetting = () => {
    if (id === 1) {
      setSetting((prev) => !prev);
    }
  };

  return (
    <ToolBox
      onClick={() => {
        onClick();
        toggleSetting();
      }}
      id={id}
      className={name}
    >
      {iconCode}
      {setting ? <Setting /> : null}
    </ToolBox>
  );
};

export default ToolItem;
