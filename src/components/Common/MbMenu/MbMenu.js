import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../App";
import styled from "styled-components";
import New from "../../../pages/New";
import { mbMenuData } from "../../../utils/utils";
import ProfileImg from "../../Profile/ProfileImg";

const MenuList = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 16px;
  display: none;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  z-index: 2;

  @media screen and (max-width: 630px) {
    display: flex;
  }
`;

const MenuItem = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: nowrap;
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
`;

const MenuText = styled.span`
  display: none;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 26px;
  }
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
`;

const MbMenu = () => {
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

  return (
    <MenuList className="menulist">
      {mbMenuData.map((it, idx) => (
        <MenuItem
          className={currentNum === idx ? "active" : ""}
          key={it.id}
          onClick={() => {
            handleOnClick(it.path);
            showNew(it.name);
            isActive(it.id);
          }}
        >
          <IconWrapper>
            {idx === 4 ? (
              <ProfileImg
                size={"38"}
                url={"/images/userImgs/user123456/feedDetail.jpg"}
                hover={true}
              />
            ) : (
              it.iconCode
            )}
          </IconWrapper>
          <MenuText className="text">{it.name}</MenuText>
        </MenuItem>
      ))}
      {openNew ? <New setOpenNew={setOpenNew} /> : null}
    </MenuList>
  );
};

export default MbMenu;
