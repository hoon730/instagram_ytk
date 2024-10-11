import React, { useState, useContext } from "react";
import { ThemeContext } from "../../App";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ToolItem from "../Common/Sidebar/ToolItem";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoMenuOutline } from "react-icons/io5";
import Notification from "./Notification";

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  width: 80%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 36px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  position: fixed;
  z-index: 1;
  @media screen and (max-width: 1024px) {
    width: calc(100% - 92px);
  }
  @media screen and (max-width: 630px) {
    width: 100%;
    height: 74px;
    padding: 14px 22px;
  }
`;

const SearchBarArea = styled.div`
  width: 500px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 630px) {
    display: none;
  }
`;

const ProfileArea = styled.div`
  width: 305px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  @media screen and (max-width: 1024px) {
    gap: 0;
    width: auto;
  }
  @media screen and (max-width: 630px) {
    display: none;
  }
`;

const NotificationArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1024px) {
    align-items: flex-end;
  }
  @media screen and (max-width: 630px) {
    width: 100%;
    position: absolute;
    transition: transform 0.5s;
    transform: ${({ heart }) =>
      heart ? "translateX(calc(-100% + 85px))" : "translateX(-85px)"};
  }
`;

const Profile = styled.div`
  width: calc(100% - 52px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  padding: 8px;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.iconBgColor};
  }
  @media screen and (max-width: 1024px) {
    width: 45px;
    border: none;
    &:hover {
      background: none;
    }
  }
  @media screen and (max-width: 630px) {
    display: none;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media screen and (max-width: 630px) {
    display: none;
  }
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const UserName = styled.div`
  font-size: var(--font-size-12);
  font-weight: var(--font-regular);
  color: var(--gray-color);
`;

const Logo = styled.img`
  display: none;
  @media screen and (max-width: 630px) {
    display: block;
    margin-top: 5px;
    width: 120px;
  }
`;

const IconAraa = styled.div`
  display: none;
  @media screen and (max-width: 630px) {
    display: flex;
    gap: 10px;
    svg {
      color: ${({ theme }) => theme.iconColor};
      &.fill {
        color: var(--sub-pink-color);
      }
    }
  }
`;

const ModeChangeIcon = styled.div``;

const MenuIcon = styled.div``;

const MainHeader = () => {
  const { darkMode } = useContext(ThemeContext);
  const [heart, setHeart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const heartChange = () => {
    setHeart((prev) => !prev);
  };

  const menuOpenBtn = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      <SearchBarArea>
        <SearchBar />
      </SearchBarArea>
      <ProfileArea>
        <NotificationArea>
          <ToolItem
            clickEvent={heartChange}
            iconCode={heart ? <GoHeartFill /> : <GoHeart />}
            name={heart ? "heartFill" : "heart"}
          />
          {heart ? <Notification /> : null}
        </NotificationArea>
        <Profile>
          <UserProfile>
            <ProfileImg
              url={`${process.env.PUBLIC_URL}/images/userImgs/user123456/profile-photo.jpg`}
              size={"45"}
              hover={"noHover"}
            />
            <ProfileText>
              <UserId userNickname={"burxxxking"} hover={"noHover"} />
              <UserName>decent</UserName>
            </ProfileText>
          </UserProfile>
        </Profile>
      </ProfileArea>
      <Logo
        className="logo"
        src={darkMode ? "/images/logo_dark.svg" : "/images/logo_light.svg"}
      />
      <IconAraa>
        <ModeChangeIcon onClick={heartChange}>
          {heart ? (
            <GoHeartFill className="fill" size={26} />
          ) : (
            <GoHeart size={26} />
          )}
        </ModeChangeIcon>
        {heart ? (
          <NotificationArea heart={heart.toString()}>
            <Notification setHeart={setHeart} />
          </NotificationArea>
        ) : null}
        <MenuIcon>
          <IoMenuOutline size={26} />
        </MenuIcon>
      </IconAraa>
    </Wrapper>
  );
};

export default MainHeader;
