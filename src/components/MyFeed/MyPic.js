import { style } from "framer-motion/client";
import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import PostAndFollow from "../User/PostAndFollow";

const Wrapper = styled.div``;

const MyPicBox = styled.div`
  width: 100%;
  padding-bottom: 10px;
  position: relative;
`;

const ProfileBg = styled.div`
  width: 100%;
  height: 270px;
  background: url(/images/postImgs/user1/bg.jpg) center/ cover no-repeat;

  @media screen and (max-width: 780px) {
    width: 100%;
    height: 230px;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
    height: 200px;
  }
`;

const ProfileImgBox = styled.div`
  position: absolute;
  top: 180px;
  left: 70px;
  border-radius: 50%;

  .storyFirstCircle {
    border: transparent;
  }

  .storySecondCircle {
    width: 175px;
    height: 175px;
    border: 7px solid var(--bg-white-color);
  }

  @media screen and (max-width: 780px) {
    width: 120px;
    height: 120px;
    top: 165px;
    left: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .storySecondCircle {
      width: 120px;
      height: 120px;
      border: 7px solid var(--bg-white-color);
    }

    .storyThirdCircle {
      width: 110px;
      height: 110px;
    }
  }

  @media screen and (max-width: 430px) {
    top: 135px;
    left: 50px;
  }
`;

const MyFeedDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-top: 10px; */
  margin-left: 250px;
  margin-right: 70px;

  @media screen and (max-width: 780px) {
    margin-left: 150px;
    margin-right: 30px;
  }

  @media screen and (max-width: 430px) {
    margin-left: 150px;
    margin-right: 0px;
  }
`;

const MyPic = () => {
  return (
    <Wrapper>
      <MyPicBox>
        <ProfileBg />
        <ProfileImgBox>
          <ProfileImg
            type={"INactive"}
            size={170}
            url={"/images/postImgs/user1/profile.jpg"}
            hover={true}
          />
        </ProfileImgBox>
        <MyFeedDesc>
          <PostAndFollow posting={"18"} follower={777} following={333} />
        </MyFeedDesc>
      </MyPicBox>
    </Wrapper>
  );
};

export default MyPic;
