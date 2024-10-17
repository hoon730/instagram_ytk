import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../App";
import { FaMoon } from "react-icons/fa";
import Setting from "./Setting";

const ToolBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.iconBgColor};
  position: relative;
  z-index: 0;
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

  &.dark {
    svg {
      color: ${({ theme }) => theme.iconColor};
      &:last-child {
        color: #f7ee94;
      }
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

  const threadUrl = "https://www.threads.net/";

  const onClick = () => {
    if (id === 1) {
      setSetting((prev) => !prev);
    }
    if (id === 2) {
      window.open(threadUrl);
    }
    if (id === 3) changeDark();
    if (name === "heart" || name === "heartFill") clickEvent();
  };

  return (
    <ToolBox
      onClick={() => {
        onClick();
      }}
      id={id}
      className={darkMode && id === 3 ? "dark" : name}
    >
      {darkMode && id === 3 ? <FaMoon /> : iconCode}
      {setting ? <Setting setSetting={setSetting} /> : null}
    </ToolBox>
  );
};

export default ToolItem;
