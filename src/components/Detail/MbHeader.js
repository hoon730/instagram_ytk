import React, { useState, useContext } from "react";
import { ThemeContext } from "../../App";
import styled from "styled-components";
import { mobileHeaderMenu } from "../../utils/utils";

import { IoChevronDown } from "react-icons/io5";
import { BsThreads } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";

const Header = styled.div`
  display: none;
  width: 100%;
  padding: 16px;
  justify-content: space-between;
  background: ${({ theme }) => theme.bgColor};

  @media screen and (max-width: 630px) {
    display: flex;
  }
`;
const IdBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Id = styled.span`
  font-size: var(--font-20);
  font-weight: var(--font-bold);
  cursor: pointer;
`;
const IdBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const HeaderBtn = styled.div`
  display: flex;
  gap: 24px;
`;
const Threads = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-22);
  }
`;

const Menu = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-24);
  }
`;

const MenuArea = styled.div`
  display: none;
  @media screen and (max-width: 630px) {
    display: block;
    width: calc(100% + 4px);
    height: 100vh;
    position: absolute;
    background: ${({ theme }) => theme.bgColor};
    border: 1px solid ${({ theme }) => theme.borderColor};
    box-shadow: 0 5px 6px ${({ theme }) => theme.shadowAlpha};
    margin-top: -24px;
    transition: transform 0.5s;
    transform: ${({ menuOpen }) =>
      menuOpen === "true"
        ? "translateX(calc(-100% + 128px))"
        : "translateX(128px)"};
  }
  z-index: 3;
`;

const MenuHeader = styled.div`
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 20px;
  font-size: var(--font-20);
  font-weight: var(--font-bold);
`;

const BackBtn = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: ${({ theme }) => theme.fontColor};
`;

const MenuItemArea = styled.ul`
  width: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItem = styled.li`
  height: 55px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-18);
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  &.setting {
    margin-bottom: 10px;
  }
  &.auth {
    height: 65px;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.borderColor};
  }
  &.logout {
    color: var(--warning-color);
    font-weight: var(--font-bold);
    svg {
      color: var(--warning-color);
    }
  }
`;

const MbHeader = ({ myProfile }) => {
  const { darkMode } = useContext(ThemeContext);
  const { changeDark } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Header>
      <IdBox>
        <Id>{myProfile?.userId}</Id>
        <IdBtn>
          <IoChevronDown />
        </IdBtn>
      </IdBox>
      <HeaderBtn>
        <Threads>
          <BsThreads />
        </Threads>
        <Menu onClick={() => setMenuOpen(true)}>
          <LuMenu />
        </Menu>
        <MenuArea menuOpen={menuOpen.toString()}>
          <MenuHeader>
            <BackBtn onClick={() => setMenuOpen(false)}>
              <FaArrowLeft />
            </BackBtn>
            메뉴
          </MenuHeader>
          <MenuItemArea>
            <MenuItem onClick={changeDark}>
              {darkMode ? <FaMoon /> : <LuSunMedium />}
              {darkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
            </MenuItem>
            {mobileHeaderMenu.map((it) => (
              <MenuItem key={it.id} className={it.className}>
                {it.iconCode}
                {it.name}
              </MenuItem>
            ))}
          </MenuItemArea>
        </MenuArea>
      </HeaderBtn>
    </Header>
  );
};

export default MbHeader;
