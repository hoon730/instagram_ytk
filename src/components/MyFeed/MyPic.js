import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import PostAndFollow from "../User/PostAndFollow";

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
    width: 185px;
    height: 185px;
  }

  .storySecondCircle {
    width: 175px;
    height: 175px;
    border: 7px solid var(--bg-white-color);
  }

  @media screen and (max-width: 900px) {
    width: 150px;
    height: 150px;
    top: 190px;
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
      border: 7px solid var(--bg-white-color);
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
  padding: 20px 0px 10px;
  margin-left: 250px;
  margin-right: 70px;

  @media screen and (max-width: 900px) {
    margin-left: 190px;
    margin-right: 30px;

    .post_follow {
      padding: 5px;
    }
  }

  @media screen and (max-width: 780px) {
    margin-left: 150px;
    margin-right: 30px;

    .post_follow {
      padding: 0px;
    }
  }

  @media screen and (max-width: 500px) {
    margin-left: 160px;
    margin-right: 0px;
  }
`;

const MyPic = ({ myProfile, myFeeds }) => {
  return (
    <Wrapper>
      <MyPicBox>
        <ProfileBg src={myProfile?.bgPhoto} />
        <ProfileImgBox>
          <ProfileImg
            type={"active"}
            size={170}
            url={myProfile?.profilePhoto}
            hover={true}
          />
        </ProfileImgBox>
        <MyFeedDesc>
          <PostAndFollow
            posting={myFeeds?.length}
            follower={myProfile?.follower.length}
            following={myProfile?.following.length}
            myProfile={myProfile}
          />
        </MyFeedDesc>
      </MyPicBox>
    </Wrapper>
  );
};

export default MyPic;
