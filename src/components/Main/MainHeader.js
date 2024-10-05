import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ToolItem from "../Common/Sidebar/ToolItem";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
`;

const SearchBarArea = styled.div`
  width: 500px;
`;

const ProfileArea = styled.div`
  width: 330px;
  height: 55px;
  display: flex;
  align-items: center;
  gap: 12px;
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
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: var(--font-12);
  font-weight: var(--font-regular);
  color: var(--gray-color);
`;

const AccountIcon = styled.div`
  height: 25px;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  svg {
    fill: var(--gray-color);
  }
`;

const MainHeader = () => {
  const [heart, setHeart] = useState(false);

  const heartChange = () => {
    setHeart((prev) => !prev);
  };

  return (
    <Wrapper>
      <SearchBarArea>
        <SearchBar />
      </SearchBarArea>
      <ProfileArea>
        <ToolItem
          clickEvent={heartChange}
          iconCode={heart ? <GoHeartFill /> : <GoHeart />}
          name={heart ? "heartFill" : "heart"}
        />
        <Profile>
          <UserProfile>
            <ProfileImg
              url={`${process.env.PUBLIC_URL}/images/userImgs/user123456/profile-photo.jpg`}
              size={"45"}
            />
            <ProfileText>
              <UserId type={"feed"} userNickname={"burxxxking"} />
              <UserName>decent</UserName>
            </ProfileText>
          </UserProfile>
          <AccountIcon>
            <IoIosArrowUp />
            <IoIosArrowDown />
          </AccountIcon>
        </Profile>
      </ProfileArea>
    </Wrapper>
  );
};

export default MainHeader;
