import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import Slide from "./Slide";
import FeedIcon from "./FeedIcon";

// 데이터
import Data from "../../data.json";
const user = Data.user;
const profile = Data.profile;
const feed = Data.feed;
const userId = "lualbvqvQmVWkfDU7JUKJRYdqf3";

const Wrapper = styled.div`
  border: 1px solid var(--light-gray-color);
  padding-bottom: 50px;
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

const FeedText = styled.div`
  font-size: var(--font-16);
  margin-top: 5px;
  ${({ $showMore }) =>
    $showMore
      ? ""
      : `display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;`}
`;

const OriginalText = styled.div`
  font-size: var(--font-16);
  word-wrap: break-word;
  overflow: hidden;
  height: 0;
`;

const MoreText = styled.span`
  margin: 25px 10px 0;
  color: var(--sub-purple-color);
  float: right;
  shape-outside: border-box;
  cursor: pointer;
`;

const HashTag = styled.span`
  margin: 0 4px;
  color: var(--sub-purple-color);
  cursor: pointer;
`;

const FeedItem = () => {
  const myProfile = profile.find((it) => it.userId === userId);
  const feedProfile = profile.find((it) => it.userId === feed[0].userId);
  const feedUser = user.find((it) => it.userId === feed[0].userId);
  const feedDetail = feed[0].feedDetail[1];

  const [lines, setLines] = useState(feedDetail.content.split("\n"));
  const [isEllipsed, setIsEllipsed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const commentRef = useRef(null);
  const originalCommentRef = useRef(null);

  useEffect(() => {
    const handleMoreButton = () => {
      if (!originalCommentRef.current || !commentRef.current) return;
      const { clientHeight: originalHeight } = originalCommentRef.current;
      const { clientHeight: commentHeight } = commentRef.current;
      setIsEllipsed(originalHeight !== commentHeight);
    };

    handleMoreButton();
    window.addEventListener("resize", handleMoreButton);
    return () => window.addEventListener("resize", handleMoreButton);
  }, []);

  const moreView = () => {
    setShowMore(true);
    setIsEllipsed(false);
  };

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
        <Slide imgPath={feedDetail.imgPath} />
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
          <FeedText $showMore={showMore}>
            {isEllipsed && <MoreText onClick={moreView}>더보기</MoreText>}
            <p ref={commentRef}>
              {lines.map((it, idx) => (
                <React.Fragment key={idx}>
                  {it
                    .split(" ")
                    .map((word, idx) =>
                      word.startsWith("#") ? (
                        <HashTag key={idx}>{word}</HashTag>
                      ) : (
                        <React.Fragment key={idx}>{word}</React.Fragment>
                      )
                    )}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </FeedText>
          <OriginalText>
            <p ref={originalCommentRef}>
              {lines.map((it, idx) => (
                <React.Fragment key={idx}>
                  {it
                    .split(" ")
                    .map((word, idx) =>
                      word.startsWith("#") ? (
                        <HashTag key={idx}>{word}</HashTag>
                      ) : (
                        <React.Fragment key={idx}>{word}</React.Fragment>
                      )
                    )}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </OriginalText>
        </FeedDesc>
      </FeedDescArea>
    </Wrapper>
  );
};

export default FeedItem;
