import React from "react";
import styled from "styled-components";
import SearchBar from "../Common/SearchBar";
import ToolItem from "../Common/Sidebar/ToolItem";

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
  width: 370px;
  height: 65px;
  border: 1px solid #f00;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MainHeader = () => {
  return (
    <Wrapper>
      <SearchBarArea>
        <SearchBar />
      </SearchBarArea>
      <ProfileArea>
        <ToolItem />
      </ProfileArea>
    </Wrapper>
  );
};

export default MainHeader;
