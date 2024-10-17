import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import { getFormattedDate } from "../../utils/utils";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import Slide from "./Slide";
import FeedIcon from "./FeedIcon";
import FeedText from "./FeedText";
import CommentInput from "../Common/CommentInput";
import ClickFeed from "../Detail/ClickFeed";
import CommentLine from "../Common/CommentLine";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";

const Wrapper = styled.div`
  padding-bottom: 50px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  }
  @media screen and (max-width: 770px) {
    padding-bottom: 22px;
  }
`;

const ProfileSection = styled.div`
  margin: 0 36px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 18px;
  @media screen and (max-width: 770px) {
    margin: 0 20px;
    height: 66px;
    gap: 10px;
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

  @media screen and (max-width: 770px) {
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
  @media screen and (max-width: 770px) {
    font-size: var(--font-10);
  }
`;

const PhotoSection = styled.div`
  width: 652px;
  height: 652px;
  margin: 0 auto;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  @media screen and (max-width: 770px) {
    width: 350px;
    height: 350px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
`;

const FeedDescArea = styled.div`
  margin: 0 36px;
  @media screen and (max-width: 770px) {
    margin: 0 20px;
  }
`;

const FeedDesc = styled.div`
  margin-top: 22px;
  @media screen and (max-width: 770px) {
    margin-top: 13px;
    & input {
      height: 28px;
      border-radius: 8px;
    }
  }
`;

const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const DateText = styled.div`
  display: none;
  @media screen and (max-width: 770px) {
    display: block;
    font-size: var(--font-14);
    margin-bottom: 12px;
    color: var(--gray-color);
  }
`;

const FeedItem = ({ feedDetail }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const { myProfile } = useContext(StateContext);
  const followResult = myProfile.following.find((it) => it === feedDetail.uid);

  const onClick = () => {
    setIsClicked((current) => !current);
  };

  const addCmt = (comment) => {
    const docRef = addDoc(collection(db, "reply"), {
      content: comment,
      createdAt: Date.now(),
      feedId: feedDetail.id,
      type: "rp",
      uid: myProfile.uid,
      like: [],
    });

    setComments([...comments, comment]);
  };

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImg
          type={"active"}
          size={"62"}
          url={feedDetail.profile.profilePhoto}
          feedDetail={feedDetail}
          myProfile={myProfile}
        />
        <UserInfo>
          <UserId
            type={"feed"}
            userNickname={feedDetail.profile.userId}
            check={feedDetail.profile.badge ? "active" : ""}
            createdAt={new Date(parseInt(feedDetail.createdAt))}
            btn={"more"}
            follwed={followResult ? "" : "팔로우"}
            uid={feedDetail.uid}
          />
          <UserName>{feedDetail.profile.userName}</UserName>
        </UserInfo>
      </ProfileSection>
      <PhotoSection>
        {feedDetail.type === "reels" ? (
          <Video autoPlay muted loop src={feedDetail.imgPath} />
        ) : (
          <Slide imgPath={feedDetail.imgPath} />
        )}
        {isClicked ? (
          <ClickFeed onClick={onClick} feedDetail={feedDetail} />
        ) : null}
      </PhotoSection>
      <FeedDescArea>
        <FeedIcon feedDetail={feedDetail} onClick={onClick} />
        <FeedDesc>
          <UserInfo>
            <UserId
              type={"feed"}
              userNickname={feedDetail.profile.userId}
              check={feedDetail.profile.badge ? "active" : ""}
              uid={feedDetail.uid}
            />
          </UserInfo>
          <FeedText feedDetail={feedDetail} />
          <DateText>{`${getFormattedDate(
            new Date(feedDetail.createdAt)
          )}`}</DateText>
          <CommentArea>
            {comments.map((it, idx) => (
              <CommentLine
                key={idx}
                userId={myProfile.userId}
                uid={myProfile.uid}
                comment={it}
              />
            ))}
          </CommentArea>

          <CommentInput width={"100%"} height={"50px"} addCmt={addCmt} />
        </FeedDesc>
      </FeedDescArea>
    </Wrapper>
  );
};

export default FeedItem;
