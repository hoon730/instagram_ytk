import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import { mobileHeaderMenu } from "../../utils/utils";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ToolItem from "../Common/Sidebar/ToolItem";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoMenuOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

import { collection, query, limit, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

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
  z-index: 2;
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
    transform: ${({ $heart }) =>
      $heart === "true"
        ? "translateX(calc(-100% + 85px))"
        : "translateX(85px)"};
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

const IconAraaMB = styled.div`
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
    transform: ${({ $menuOpen }) =>
      $menuOpen === "true"
        ? "translateX(calc(-100% + 85px))"
        : "translateX(85px)"};
  }
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

const MainHeader = () => {
  const { darkMode } = useContext(ThemeContext);
  const { changeDark } = useContext(ThemeContext);
  const [heart, setHeart] = useState(false);
  const [myProfile, setMyProfile] = useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const heartChange = () => {
    setHeart((prev) => !prev);
  };

  useEffect(() => {
    const userUid = auth.currentUser?.uid;
    if (userUid) {
      const getMyProfile = async (uid) => {
        const profileQuery = query(
          collection(db, "profile"),
          where("uid", "==", uid),
          limit(1)
        );
        const profileSnapshot = await getDocs(profileQuery);

        if (!profileSnapshot.empty) {
          const profileData = profileSnapshot.docs[0].data();
          setMyProfile(profileData);
        }
      };

      getMyProfile(userUid);
    }
  }, []);

  const logOut = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ask = confirm("로그아웃 하시겠습니까?");
    if (ask) {
      await auth.signOut();
      navigate("/login");
    }
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
        <Profile onClick={() => navigate("/profile")}>
          <UserProfile>
            <ProfileImg
              url={
                myProfile?.profilePhoto
                  ? myProfile?.profilePhoto
                  : "/images/user_img.jpg"
              }
              size={"45"}
              hover={"noHover"}
            />
            <ProfileText>
              <UserId
                userNickname={myProfile ? myProfile.userId : ""}
                hover={"noHover"}
              />
              <UserName>{myProfile ? myProfile.userName : null}</UserName>
            </ProfileText>
          </UserProfile>
        </Profile>
      </ProfileArea>
      <Logo
        className="logo"
        src={darkMode ? "/images/logo_dark.svg" : "/images/logo_light.svg"}
      />
      <IconAraaMB>
        <ModeChangeIcon onClick={heartChange}>
          {heart ? (
            <GoHeartFill className="fill" size={26} />
          ) : (
            <GoHeart size={26} />
          )}
        </ModeChangeIcon>
        <NotificationArea $heart={heart.toString()}>
          <Notification setHeart={setHeart} />
        </NotificationArea>
        <MenuIcon onClick={() => setMenuOpen(true)}>
          <IoMenuOutline size={26} />
        </MenuIcon>
        <MenuArea $menuOpen={menuOpen.toString()}>
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
              <MenuItem
                onClick={() => {
                  if (it.name === "로그아웃") {
                    logOut();
                  }
                }}
                key={it.id}
                className={it.className}
              >
                {it.iconCode}
                {it.name}
              </MenuItem>
            ))}
          </MenuItemArea>
        </MenuArea>
      </IconAraaMB>
    </Wrapper>
  );
};

export default MainHeader;
