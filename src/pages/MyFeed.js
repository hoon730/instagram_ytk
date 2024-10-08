import React, { useState } from "react";
import styled from "styled-components";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import MyPost from "../components/MyFeed/MyPost";
import MyPostItem from "../components/MyFeed/MyPostItem";
import TimeLine from "../components/Detail/TimeLine";

const Wrapper = styled.div`
  width: 936px;
  margin: 0 auto;
  /* border: 1px solid lightgray; */

  @media screen and (max-width: 390px) {
    width: 390px;
    border: 1px solid red;
  }
`;

const MyFeed = () => {
  return (
    <Wrapper>
      <MyPic />
      <MyProfile />
      <MyHighlight />
      <MyFeedTabBar />
      <TimeLine />
      <MyPost />
    </Wrapper>
  );
};

export default MyFeed;
