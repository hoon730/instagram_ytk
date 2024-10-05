import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../App";
import styled from "styled-components";
import { menuData } from "../../../utils/utils";
import { toolData } from "../../../utils/utils";
// import MenuItem from "./MenuItem";
import ToolItem from "./ToolItem";
import New from "../../../pages/New";

import { FaInstagram } from "react-icons/fa6";

const StyledAside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 100vh;
  padding: 0 37.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  z-index: 1;

  @media screen and (max-width: 1024px) {
    width: 92px;
    padding: 0;

    .mobile_logo {
      display: flex;
    }

    .logo {
      display: none;
    }

    .menulist {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .toollist {
      flex-direction: column-reverse;
      align-items: center;
    }
  }
  @media screen and (max-width: 630px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stlyedh1 = styled.h1`
  max-width: 305px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MobileLogo = styled.div`
  display: none;
  width: 130px;
  justify-content: center;
  align-items: center;

  svg {
    font-size: var(--font-24);
    color: ${({ theme }) => theme.fontColor};
  }
`;

const Logo = styled.img`
  width: 130px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuItem = styled.div`
  width: 100%;
  height: 65px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: var(--border-radius-12);

  &.active {
    background: ${({ theme }) => theme.fontColor};
    color: ${({ theme }) => theme.bgColor};
    font-weight: var(--font-bold);
  }

  &:hover {
    color: var(--gray-color);
  }

  @media screen and (max-width: 1024px) {
    width: 55px;
    height: 55px;
    padding-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      display: none;
    }
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 20px;
  }
`;
const MenuText = styled.span`
  font-size: 20px;
`;

const ToolList = styled.div`
  display: flex;
  margin-bottom: 40px;
  gap: 8px;
`;

const NewBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 3;
`;

const SideBar = () => {
  const navigate = useNavigate();
  const newBgRef = useRef();
  const { darkMode } = useContext(ThemeContext);
  const [openNew, setOpenNew] = useState(false);
  const [currentNum, setCurrentNum] = useState(0);

  const handleOnClick = (path) => {
    if (path) navigate(`${path}`);
  };

  const showNew = (name) => {
    if (name === "만들기") onClick();
  };

  const isActive = (num) => {
    setCurrentNum(num);
  };

  const onClick = () => {
    setOpenNew(true);
  };

  const closeNew = () => {
    setOpenNew(false);
  };

  return (
    <StyledAside>
      <Wrapper>
        <Stlyedh1>
          <MobileLogo
            className="mobile_logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <FaInstagram />
          </MobileLogo>
          <Logo
            className="logo"
            src={darkMode ? "/images/logo_dark.svg" : "/images/logo_light.svg"}
            onClick={() => {
              navigate("/");
            }}
          />
        </Stlyedh1>
        <MenuList className="menulist">
          {menuData.map((it, idx) => (
            <MenuItem
              className={currentNum === idx ? "active" : ""}
              key={it.id}
              onClick={() => {
                handleOnClick(it.path);
                showNew(it.name);
                isActive(it.id);
              }}
            >
              <IconWrapper>{it.iconCode}</IconWrapper>
              <MenuText className="text">{it.name}</MenuText>
            </MenuItem>
          ))}
          {openNew ? (
            <NewBg
              ref={newBgRef}
              onClick={(e) => {
                if (e.target === newBgRef.current) setOpenNew(false);
              }}
            >
              <New closeNew={closeNew} />
            </NewBg>
          ) : null}
        </MenuList>
      </Wrapper>
      <ToolList className="toollist">
        {toolData.map((it) => (
          <ToolItem key={it.id} {...it} />
        ))}
      </ToolList>
    </StyledAside>
  );
};

export default SideBar;
