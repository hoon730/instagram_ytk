import React, { useEffect, useState } from "react";
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
import {
  collection,
  limit,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const Wrapper = styled.div`
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  @media screen and (max-width: 1024px) {
    padding: 13px 0;
  }
`;

const LeftIcons = styled.span`
  display: flex;
  gap: 30px;
  @media screen and (max-width: 1024px) {
    gap: 18px;
  }
`;

const icon = `
  width: 40px;
  height: 40px;
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
`;

const HeartFill = styled(GoHeartFill)`
  ${icon}
  fill: crimson;
  color: ${({ theme }) => theme.iconColor};
`;

const Reply = styled(IoChatbubbleEllipsesOutline)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
`;

const Message = styled(IoPaperPlaneOutline)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
`;

const Bookmark = styled(GoBookmark)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
`;

const BookmarkFill = styled(GoBookmarkFill)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
`;

const LikeSection = styled.div`
  font-size: var(--font-16);
  color: ${({ theme }) => theme.fontColor};
  position: relative;
  strong {
    font-weight: bold;
    cursor: pointer;
  }
  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
  }
`;

const FeedIcon = ({ feedDetail, myProfile }) => {
  const [followingUser, setFollowingUser] = useState("");
  const [fillHeart, setFillHeart] = useState(false);
  const [fillBookmark, setFillBookmark] = useState(false);
  const [likes, setLikes] = useState(feedDetail.like);
  const [likeUser, setLikeUser] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setFillHeart(likes.includes(myProfile.uid));
    updateDoc(doc(db, "feed", feedDetail.id), { like: likes });
  }, [likes]);

  useEffect(() => {
    const likeFollowing = feedDetail.like.find((it) =>
      myProfile.following.includes(it)
    );

    const getFollowingProfile = async (uid) => {
      const profileQuery = query(
        collection(db, "profile"),
        where("uid", "==", uid),
        limit(1)
      );
      const profileSnapshot = await getDocs(profileQuery);

      if (!profileSnapshot.empty) {
        const profileData = profileSnapshot.docs[0].data();
        setFollowingUser(profileData);
      }
    };

    getFollowingProfile(likeFollowing);
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
      try {
        const likeUserQuery = query(
          collection(db, "profile"),
          where("uid", "in", feedDetail.like)
        );

        const querySnapshot = await getDocs(likeUserQuery);

        const likeUserInfo = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: data.uid,
            userId: data.userId,
            userName: data.userName,
            badge: data.badge,
            profilePhoto: data.profilePhoto,
            follow:
              data.uid === myProfile.uid
                ? 2
                : myProfile.following.includes(data.uid)
                ? 1
                : 0,
          };
        });

        const sortedLikeUserInfo = likeUserInfo.sort(
          (a, b) => b.follow - a.follow
        );

        setLikeUser(sortedLikeUserInfo);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    setShowProfile((prev) => !prev);
  };

  return (
    <Wrapper>
      <Icons>
        <LeftIcons>
          {fillHeart ? (
            <HeartFill onClick={toggleHeart} />
          ) : (
            <Heart onClick={toggleHeart} />
          )}
          <Reply />
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
          <ViewLikes likeUser={likeUser} setShowProfile={setShowProfile} />
        ) : null}
      </LikeSection>
    </Wrapper>
  );
};

export default FeedIcon;
