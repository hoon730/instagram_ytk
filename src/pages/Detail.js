import React from "react";
import SideBar from "../components/Common/Sidebar/SideBar";
import styled from "styled-components";
import UserInfo from "../components/User/UserInfo";
import CommentInput from "../components/Common/CommentInput";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Profile = styled.div``;

const Detail = () => {
  return (
    <Wrapper>
      <SideBar />
      <Profile>
        <UserInfo />
        <CommentInput width={"500"} />
      </Profile>
    </Wrapper>
  );
};

export default Detail;
