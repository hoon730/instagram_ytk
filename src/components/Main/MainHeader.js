import React from "react";
import styled from "styled-components";
import SearchBar from "../Common/SearchBar";
import ToolItem from "../Common/Sidebar/ToolItem";
import ProfileImg from "../Profile/ProfileImg";

const Wrapper = styled.div`
  border-bottom: 1px solid var(--light-gray-color);
  height: 120px;
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
  height: 65px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Profile = styled.div`
  width: calc(100% - 52px);
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--light-gray-color);
  border-radius: 12px;
`;

const MainHeader = () => {
  return (
    <Wrapper>
      <SearchBarArea>
        <SearchBar />
      </SearchBarArea>
      <ProfileArea>
        <ToolItem />
        <Profile>
          <ProfileImg
            url={`${process.env.PUBLIC_URL}/images/userImgs/user123456/profile-photo.jpg`}
            size={"55"}
          />
        </Profile>
      </ProfileArea>
    </Wrapper>
  );
};

export default MainHeader;
