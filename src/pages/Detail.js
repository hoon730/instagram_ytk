import React from "react";
import SideBar from "../components/Common/Sidebar/SideBar";
import styled from "styled-components";
import UserInfo from "../components/User/UserInfo";
import CommentInput from "../components/Common/CommentInput";
import Button from "../components/Common/Button";
import HoverProfile from "../components/User/HoverProfile";
import UserId from "../components/User/UserId";

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
        <CommentInput width={"600px"} />
        <Button width={"300px"} type={"positive"} />
        <HoverProfile />
      </Profile>
    </Wrapper>
  );
};

export default Detail;
