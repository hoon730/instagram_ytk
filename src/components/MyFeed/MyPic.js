import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import PostAndFollow from "../User/PostAndFollow";
import { StateContext } from "../../App";

const Wrapper = styled.div``;

const MyPicBox = styled.div`
  width: 100%;
  position: relative;
`;

const ProfileBg = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;

  @media screen and (max-width: 780px) {
    width: 100%;
    height: 230px;
  }

  @media screen and (max-width: 630px) {
    width: 100%;
    height: 150px;
  }
`;

const ProfileImgBox = styled.div`
  position: absolute;
  top: 170px;
  left: 70px;
  border-radius: 50%;

  .storyFirstCircle {
    width: 185px;
    height: 185px;
  }

  .storySecondCircle {
    width: 175px;
    height: 175px;
    /* border: 7px solid var(--bg-white-color); */
  }

  @media screen and (max-width: 900px) {
    width: 150px;
    height: 150px;
    top: 185px;
    left: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .storyFirstCircle {
      width: 160px;
      height: 160px;
    }

    .storySecondCircle {
      width: 150px;
      height: 150px;
      border: transparent;
    }

    .storyThirdCircle {
      width: 140px;
      height: 140px;
    }
  }

  @media screen and (max-width: 780px) {
    width: 120px;
    height: 120px;
    top: 165px;
    left: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .storyFirstCircle {
      width: 130px;
      height: 130px;
    }

    .storySecondCircle {
      width: 120px;
      height: 120px;
      border: transparent;
      /* border: 7px solid var(--bg-white-color); */
      /* background: rgba(255, 255, 255, 0); */
    }

    .storyThirdCircle {
      width: 110px;
      height: 110px;
    }
  }

  @media screen and (max-width: 630px) {
    width: 70px;
    height: 70px;
    top: 162px;
    left: 15px;

    .storyFirstCircle {
      width: 70px;
      height: 70px;
    }

    .storySecondCircle {
      width: 65px;
      height: 65px;
      border: 3px solid var(--bg-white-color);
    }

    .storyThirdCircle {
      width: 60px;
      height: 60px;
    }
  }
`;

const MyFeedDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px 10px;
  margin-left: 250px;
  margin-right: 70px;
  /* border: 1px solid red; */

  @media screen and (max-width: 900px) {
    margin-left: 190px;
    margin-right: 30px;

    .post_follow {
      padding: 5px;
    }
  }

  @media screen and (max-width: 780px) {
    margin-left: 170px;
    margin-right: 30px;

    .post_follow {
      padding: 0px;
    }
  }

  @media screen and (max-width: 630px) {
    margin-left: 110px;
    margin-right: 20px;
    padding: 0 20px;
    height: 90px;

    .post_follow {
      justify-content: space-between;
    }
  }
`;

const MyPic = ({ userId, posts }) => {
  const { allProfile } = useContext(StateContext);
  const { myProfile } = useContext(StateContext);

  const feedProfile = userId
    ? allProfile.find((it) => it.userId === userId)
    : myProfile;

  return (
    <Wrapper>
      <MyPicBox>
        <ProfileBg
          src={
            feedProfile?.bgPhoto
              ? feedProfile.bgPhoto
              : "/images/mb_Profile_bg.jpg"
          }
        />
        <ProfileImgBox>
          <ProfileImg
            type={"active"}
            size={170}
            url={
              feedProfile?.profilePhoto
                ? feedProfile.profilePhoto
                : "/images/user_img.jpg"
            }
            hover={true}
          />
        </ProfileImgBox>
        <MyFeedDesc>
          <PostAndFollow
            posting={posts?.length}
            follower={feedProfile?.follower.length}
            following={feedProfile?.following.length}
            myProfile={feedProfile}
          />
        </MyFeedDesc>
      </MyPicBox>
    </Wrapper>
  );
};

export default MyPic;
