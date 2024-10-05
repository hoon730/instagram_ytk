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
`;

const ProfileSection = styled.div`
  margin: 0 36px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserName = styled.p`
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const PhotoSection = styled.div`
  width: 652px;
  height: 815px;
  margin: 0 auto;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

const FeedDescArea = styled.div`
  margin: 0 36px;
`;

const FeedDesc = styled.div`
  margin-top: 22px;
`;

const FeedItem = ({ user, profile, myProfile, feedUserId, feedDetail }) => {
  const feedProfile = profile.find((it) => it.userId === feedUserId);
  const feedUser = user.find((it) => it.userId === feedUserId);

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
            createDate={feedDetail.createDate}
            btn={"more"}
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
