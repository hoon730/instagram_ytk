import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import PostAndFollow from "../User/PostAndFollow";

const Wrapper = styled.div`
  @media screen and (max-width: 780px) {
    width: 780px;
  }

  @media screen and (max-width: 430px) {
    width: 390px;
  }
`;

const MyPicBox = styled.div`
  width: 100%;
  padding-bottom: 10px;
  position: relative;
`;

const ProfileBg = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;

  @media screen and (max-width: 430px) {
    width: 100%;
    height: 200px;
  }
`;

const ProfileImgBox = styled.div`
  position: absolute;
  top: 180px;
  left: 70px;
  border: 7px solid var(--bg-white-color);
  border-radius: 50%;
`;

const MyFeedDesc = styled.div`
  width: 635px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  margin-left: 250px;
`;

const MyPic = ({ myProfile, myFeeds }) => {

  return (
    <Wrapper>
      <MyPicBox>
        <ProfileBg src={myProfile?.bgPhoto} />
        <ProfileImgBox>
          <ProfileImg
            type={"INactive"}
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
