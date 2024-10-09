import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import Slide from "./Slide";
import FeedIcon from "./FeedIcon";
import FeedText from "./FeedText";
import CommentInput from "../Common/CommentInput";

const Wrapper = styled.div`
  padding-bottom: 50px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  }
  @media screen and (max-width: 1024px) {
    padding-bottom: 22px;
  }
`;

const ProfileSection = styled.div`
  margin: 0 36px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 18px;
  @media screen and (max-width: 1024px) {
    margin: 0 20px;
    height: 66px;
    & .storyFirstCircle {
      width: 46px;
      height: 46px;
      & .storySecondCircle {
        width: 42px;
        height: 42px;
        & .storyThirdCircle {
          width: 38px;
          height: 38px;
        }
      }
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;

  @media screen and (max-width: 1024px) {
    gap: 0px;
    font-size: var(--font-12);
    .user-id {
      font-size: var(--font-12);
    }
    .user-check {
      width: 10px;
    }
    .user-date {
      font-size: var(--font-10);
    }
    .user-followed {
      font-size: var(--font-10);
    }
  }
`;

const UserName = styled.p`
  font-size: var(--font-14);
  color: var(--gray-color);
  @media screen and (max-width: 1024px) {
    font-size: var(--font-10);
  }
`;

const PhotoSection = styled.div`
  width: 652px;
  height: 815px;
  margin: 0 auto;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    width: 350px;
    height: 350px;
  }
`;

const FeedDescArea = styled.div`
  margin: 0 36px;
  @media screen and (max-width: 1024px) {
    margin: 0 20px;
  }
`;

const FeedDesc = styled.div`
  margin-top: 22px;
  @media screen and (max-width: 1024px) {
    margin-top: 13px;
    & input {
      height: 28px;
      border-radius: 8px;
    }
  }
`;

const FeedItem = ({ user, profile, myProfile, feedUserId, feedDetail }) => {
  const feedProfile = profile.find((it) => it.userId === feedUserId);
  const feedUser = user.find((it) => it.userId === feedUserId);
  const followResult = myProfile.following.find((it) => it === feedUserId);

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImg
          type={"active"}
          size={"62"}
          url={feedProfile.profilePhoto}
        />
        <UserInfo>
          <UserId
            type={"feed"}
            userNickname={feedUser.userNickname}
            check={feedProfile.badge ? "active" : ""}
            createdAt={new Date(feedDetail.createDate)}
            btn={"more"}
            follwed={followResult ? "" : "팔로우"}
          />
          <UserName>{feedProfile.userName}</UserName>
        </UserInfo>
      </ProfileSection>
      <PhotoSection>
        {feedDetail.type === "reels" ? (
          <video
            autoPlay
            muted
            loop
            src={feedDetail.imgPath}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Slide imgPath={feedDetail.imgPath} />
        )}
      </PhotoSection>
      <FeedDescArea>
        <FeedIcon user={user} feedDetail={feedDetail} myProfile={myProfile} />
        <FeedDesc>
          <UserInfo>
            <UserId
              type={"feed"}
              userNickname={feedUser.userNickname}
              check={feedProfile.badge ? "active" : ""}
            />
          </UserInfo>
          <FeedText feedDetail={feedDetail} />
          <CommentInput width={"100%"} height={"50px"} />
        </FeedDesc>
      </FeedDescArea>
    </Wrapper>
  );
};

export default FeedItem;
