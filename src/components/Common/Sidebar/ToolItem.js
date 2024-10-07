import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../App";
import Setting from "./Setting";
import { FaMoon } from "react-icons/fa";

const ToolBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.iconBgColor};
  position: relative;
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

  &.dark {
    svg {
      color: ${({ theme }) => theme.iconColor};
    }
  }

  &.heartFill {
    svg {
      color: var(--sub-pink-color);
    }
  }

  @media screen and (max-width: 1024px) {
    &:nth-child(2) {
      display: none;
    }
  }
`;

const ToolItem = ({ name, iconCode, id, clickEvent }) => {
  const [setting, setSetting] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const { changeDark } = useContext(ThemeContext);

  const onClick = () => {
    if (id === 3) changeDark();
    if (name === "heart" || name === "heartFill") clickEvent();
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
      className={darkMode && id === 3 ? "dark" : name}
    >
      {darkMode && id === 3 ? <FaMoon /> : iconCode}
      {setting ? <Setting /> : null}
    </ToolBox>
  );
};

export default ToolItem;
