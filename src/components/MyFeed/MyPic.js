import { style } from "framer-motion/client";
import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import PostAndFollow from "../User/PostAndFollow";

const Wrapper = styled.div``;

const MyPicBox = styled.div`
  width: 100%;
  height: 410px;
  /* border: 1px solid red; */
  position: relative;
`;

const ProfileBg = styled.div`
  width: 100%;
  height: 310px;
  background: url(/images/postImgs/user1/bg.jpg) center -130px / cover no-repeat;
`;

const ProfileImgBox = styled.div`
  position: absolute;
  top: 220px;
  left: 70px;
  border: 7px solid var(--bg-white-color);
  border-radius: 50%;
`;

const MyFeedDesc = styled.div`
  width: 635px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 250px;
`;

const MyPic = () => {
  return (
    <Wrapper>
      <MyPicBox>
        <ProfileBg></ProfileBg>
        <ProfileImgBox>
          <ProfileImg
            type={"INactive"}
            size={170}
            url={"/images/postImgs/user1/post17.jpg"}
          />
        </ProfileImgBox>
        <MyFeedDesc>
          <PostAndFollow posting={"73"} follower={7733} following={377} />
        </MyFeedDesc>
      </MyPicBox>
    </Wrapper>
  );
};

export default MyPic;
