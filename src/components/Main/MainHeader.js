import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../Common/SearchBar";
import ToolItem from "../Common/Sidebar/ToolItem";
import ProfileImg from "../Profile/ProfileImg";
import UserInfo from "../User/UserInfo";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Wrapper = styled.div`
  border-bottom: 1px solid var(--light-gray-color);
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px;
`;

const SearchBarArea = styled.div`
  width: 585px;
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
  border: 1px solid var(--light-gray-color);
  border-radius: 12px;
  padding: 8px;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: var(--light-gray-color);
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

const UserNickname = styled.div`
  font-size: var(--font-14);
  font-weight: var(--font-bold);
`;

const Optional = styled.div`
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
    console.log("Click");
    setHeart((prev) => !prev);
  };

  return (
    <Wrapper>
      <SearchBarArea>
        <SearchBar />
      </SearchBarArea>
      <ProfileArea>
        <ToolItem
          onClick={heartChange}
          iconCode={heart ? <GoHeartFill /> : <GoHeart />}
        />
        <Profile>
          <UserProfile>
            <ProfileImg
              url={`${process.env.PUBLIC_URL}/images/userImgs/user123456/profile-photo.jpg`}
              size={"45"}
            />
            <ProfileText>
              <UserNickname>lotte_ria</UserNickname>
              <Optional>decent</Optional>
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
