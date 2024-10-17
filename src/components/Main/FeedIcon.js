import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import ViewLikes from "./ViewLikes";
import {
  GoHeart,
  GoHeartFill,
  GoBookmark,
  GoBookmarkFill,
} from "react-icons/go";
import {
  IoPaperPlaneOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { db } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Wrapper = styled.div`
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ $type }) => ($type === "detail" ? "0px" : "20px 0px")};
  @media screen and (max-width: 1024px) {
    padding-bottom: 10px;
  }
`;

const LeftIcons = styled.span`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 1024px) {
    gap: 18px;
  }
`;

const RightIcons = styled.span`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 1024px) {
    gap: 18px;
  }
`;

const icon = `
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover{
    color: var(--gray-color);
  }
  @media screen and (max-width: 1024px) {
    width: 23px;
    height: 23px;
  }
`;

const Heart = styled(GoHeart)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
  ${({ $type }) => ($type === "detail" ? "width: 20px; height: 20px;" : "")}
  @media screen and (max-width: 1024px) {
    ${({ $type }) => ($type === "detail" ? "width: 18px; height: 18px;" : "")}
  }
`;

const HeartFill = styled(GoHeartFill)`
  ${icon}
  color: var(--sub-pink-color);
  &:hover {
    color: #cf236a;
  }
  ${({ $type }) => ($type === "detail" ? "width: 20px; height: 20px;" : "")}
  @media screen and (max-width: 1024px) {
    ${({ $type }) => ($type === "detail" ? "width: 18px; height: 18px;" : "")}
  }
`;

const Reply = styled(IoChatbubbleEllipsesOutline)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
`;

const Message = styled(IoPaperPlaneOutline)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
  ${({ $type }) => ($type === "detail" ? "width: 20px; height: 20px;" : "")}
  @media screen and (max-width: 1024px) {
    ${({ $type }) => ($type === "detail" ? "width: 18px; height: 18px;" : "")}
  }
`;

const Bookmark = styled(GoBookmark)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
  ${({ $type }) => ($type === "detail" ? "width: 20px; height: 20px;" : "")}
  @media screen and (max-width: 1024px) {
    ${({ $type }) => ($type === "detail" ? "width: 18px; height: 18px;" : "")}
  }
`;

const BookmarkFill = styled(GoBookmarkFill)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
  ${({ $type }) => ($type === "detail" ? "width: 20px; height: 20px;" : "")}
  @media screen and (max-width: 1024px) {
    ${({ $type }) => ($type === "detail" ? "width: 18px; height: 18px;" : "")}
  }
`;

const LikeSection = styled.div`
  font-size: ${({ $type }) =>
    $type === "detail" ? "var(--font-16)" : "var(--font-14)"};
  color: ${({ theme }) => theme.fontColor};
  position: relative;
  strong {
    font-weight: bold;
    cursor: pointer;
  }
  .likes-section {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .hover-wrapper {
    top: 20%;
    left: 60%;
  }
  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
  }
`;

const BgFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const FeedIcon = ({ feedDetail, onClick, type }) => {
  const [followingUser, setFollowingUser] = useState("");
  const [fillHeart, setFillHeart] = useState(false);
  const [fillBookmark, setFillBookmark] = useState(false);
  const [likes, setLikes] = useState(feedDetail.like);
  const [likeUser, setLikeUser] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  useEffect(() => {
    setFillHeart(likes.includes(myProfile.uid));
    updateDoc(doc(db, "feed", feedDetail.id), { like: likes });
  }, [likes]);

  useEffect(() => {
    const likesArray = feedDetail.like || [];

    const likeFollowing = likesArray.find((it) =>
      myProfile.following.includes(it)
    );

    const profileData = allProfile.find((it) => it.uid === likeFollowing);
    setFollowingUser(profileData);
  }, [feedDetail]);
  
  const toggleHeart = () => {
    if (fillHeart) {
      setLikes(likes.filter((it) => it !== myProfile.uid));
    } else {
      setLikes([...likes, myProfile.uid]);
    }
  };

  const toggleBookmark = () => {
    setFillBookmark((prev) => !prev);
  };

  const showLikeUserWithFollow = async () => {
    if (!showProfile) {
      const likeUserInfo = allProfile
        .filter((it) => feedDetail.like.includes(it.uid))
        .map((info) => {
          return {
            uid: info.uid,
            userId: info.userId,
            userName: info.userName,
            badge: info.badge,
            profilePhoto: info.profilePhoto,
            follow:
              info.uid === myProfile.uid
                ? 2
                : myProfile.following.includes(info.uid)
                ? 1
                : 0,
          };
        })
        .sort((a, b) => b.follow - a.follow);
      setLikeUser(likeUserInfo);
    }
    setShowProfile((prev) => !prev);
  };

  return (
    <Wrapper>
      {type === "detail" ? (
        <>
          <Icons $type={type}>
            <LeftIcons>
              {fillHeart ? (
                <HeartFill $type={type} onClick={toggleHeart} />
              ) : (
                <Heart $type={type} onClick={toggleHeart} />
              )}
              <LikeSection>
                {followingUser ? (
                  <>
                    {followingUser.userId}님 외{" "}
                    <strong onClick={showLikeUserWithFollow}>여러 명</strong>이
                    좋아합니다
                  </>
                ) : (
                  <strong onClick={showLikeUserWithFollow}>
                    좋아요 {feedDetail.like.length}개
                  </strong>
                )}
                {showProfile ? (
                  <>
                    <ViewLikes
                      likeUser={likeUser}
                      setShowProfile={setShowProfile}
                    />
                    <BgFilter onClick={() => setShowProfile(false)}></BgFilter>
                  </>
                ) : null}
              </LikeSection>
            </LeftIcons>
            <RightIcons>
              <Message $type={type} />
              {fillBookmark ? (
                <BookmarkFill $type={type} onClick={toggleBookmark} />
              ) : (
                <Bookmark $type={type} onClick={toggleBookmark} />
              )}
            </RightIcons>
          </Icons>
        </>
      ) : (
        <>
          <Icons>
            <LeftIcons>
              {fillHeart ? (
                <HeartFill onClick={toggleHeart} />
              ) : (
                <Heart onClick={toggleHeart} />
              )}
              <Reply onClick={onClick} />
              <Message />
            </LeftIcons>
            {fillBookmark ? (
              <BookmarkFill onClick={toggleBookmark} />
            ) : (
              <Bookmark onClick={toggleBookmark} />
            )}
          </Icons>
          <LikeSection>
            {followingUser ? (
              <>
                {followingUser.userId}님 외{" "}
                <strong onClick={showLikeUserWithFollow}>여러 명</strong>이
                좋아합니다
              </>
            ) : (
              <strong onClick={showLikeUserWithFollow}>
                좋아요 {feedDetail.like.length}개
              </strong>
            )}
            {showProfile ? (
              <>
                <ViewLikes
                  likeUser={likeUser}
                  setShowProfile={setShowProfile}
                />
                <BgFilter onClick={() => setShowProfile(false)}></BgFilter>
              </>
            ) : null}
          </LikeSection>
        </>
      )}
    </Wrapper>
  );
};

export default FeedIcon;
