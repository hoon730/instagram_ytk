import React from "react";
import styled from "styled-components";
import ClickFeed from "../components/Detail/ClickFeed"
import Follower from "../components/Detail/Follower"
import HoverProfile from "../components/User/HoverProfile"
import UserInfo from "../components/User/UserInfo";
import TabBarBtn from "../components/Common/TabBarBtn";

const Wrapper = styled.div``;

const Detail = () => {
  return (
    <Wrapper>
      <ClickFeed />
      {/* <Follower/> */}
      {/* <HoverProfile/> */}
      {/* <UserInfo/> */}
    </Wrapper>
  );
};

export default Detail;
