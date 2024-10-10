import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBarBtn from "../Common/TabBarBtn";
import { FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import FeedItem from "./FeedItem";
import Loading from "../Common/Loading";
import { auth, db } from "../../utils/firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  Unsubscribe,
  getDocs,
} from "firebase/firestore";

// 파이어 스토어 연결하면 지울 목업 데이터
//import Data from "../../data.json";
//const user = Data.user;
// const profile = Data.profile;
// const feed = Data.feed;
// const userId = "lualbvqvQmVWkfDU7JUKJRYdqf3";
// const myProfile = profile.find((it) => it.userId === userId);

const Wrapper = styled.div``;

const FeedArea = styled.div`
  width: 680px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 430px;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const FeedTabBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const FeedTabBtn = styled.div`
  display: flex;
  height: 60px;
`;

const ActiveBorderArea = styled.div`
  width: 100%;
  height: 3px;
`;

const ActiveBorder = styled.div`
  width: 50%;
  height: 100%;
  background: ${({ theme }) => theme.fontColor};
  transition: transform 0.3s;
  ${({ $tabChange }) =>
    $tabChange === "recommend"
      ? `transform: translateX(0);`
      : `transform: translateX(100%);`}
`;

const FeedContent = () => {
  const [recommend, setRecommend] = useState(true);
  const [follow, setFollow] = useState(false);
  const [$tabChange, setTabChange] = useState("recommend");
  const [userUid, setUserUid] = useState(null); // 사용자 UID 상태 관리
  const [myProfile, setMyProfile] = useState(null); // 프로필 상태 관리
  const [posts, setPosts] = useState([]); // 포스트 상태 관리
  let postsUnsubscribe = null; // postsQuery 구독 해제 변수

  useEffect(() => {
    // Firebase 인증 상태 변화를 감지
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // 로그인된 사용자가 있을 때 userUid 설정
        setUserUid(user.uid);

        try {
          // 프로필 쿼리
          const profileQuery = query(
            collection(db, "profile"),
            where("uid", "==", user.uid),
            limit(1)
          );
          const profileSnapshot = await getDocs(profileQuery);

          if (!profileSnapshot.empty) {
            const profileData = profileSnapshot.docs[0].data();
            setMyProfile(profileData);

            // Firestore 구독 시작
            const postsQuery = query(
              collection(db, "feed"),
              where("uid", "in", profileData.following),
              where("type", "!=", null),
              orderBy("createdAt", "desc"),
              limit(5)
            );

            // 기존에 존재하는 postsQuery 구독이 있다면 해제
            if (postsUnsubscribe) {
              postsUnsubscribe();
            }

            // 새로운 postsQuery 구독 시작
            postsUnsubscribe = onSnapshot(postsQuery, (snapshot) => {
              const posts = snapshot.docs.map((doc) => {
                const {
                  content,
                  createdAt,
                  hashtag,
                  imgPath,
                  like,
                  location,
                  tagUser,
                  type,
                  uid,
                } = doc.data();
                return {
                  id: doc.id,
                  content,
                  createdAt,
                  hashtag,
                  imgPath,
                  like,
                  location,
                  tagUser,
                  type,
                  uid,
                };
              });
              setPosts(posts);
            });
          } else {
            console.error("Profile not found for user.");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setUserUid(null); // 로그아웃되거나 사용자가 없는 경우 처리
        setPosts([]); // 로그아웃 시 포스트 초기화
      }
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => {
      // Firebase 인증 구독 해제
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
      // postsQuery 구독 해제
      if (postsUnsubscribe) {
        postsUnsubscribe();
      }
    };
  }, []);

  console.log(myProfile);
  console.log(posts);

  const recommendActive = () => {
    setRecommend(true);
    setFollow(false);
    setTabChange("recommend");
  };
  const followActive = () => {
    setRecommend(false);
    setFollow(true);
    setTabChange("follow");
  };

  return (
    <Wrapper>
      <FeedArea>
        <FeedTabBar>
          <ActiveBorderArea>
            <ActiveBorder $tabChange={$tabChange} />
          </ActiveBorderArea>
          <FeedTabBtn>
            <TabBarBtn
              onClick={recommendActive}
              width={340}
              iconCode={<FaRegStar />}
              text={"추천 게시물"}
              isActive={recommend}
            />
            <TabBarBtn
              onClick={followActive}
              width={340}
              iconCode={<FiUser />}
              text={"팔로우"}
              isActive={follow}
            />
          </FeedTabBtn>
        </FeedTabBar>
        {/* {feed[3].feedDetail.map((it, idx) => (
          <FeedItem
            key={idx}
            user={user}
            profile={profile}
            myProfile={myProfile}
            feedUserId={feed[3].userId}
            feedDetail={it}
          />
        ))} */}
        {/* {posts.length > 0
          ? posts.map((post) => (
              <FeedItem
                key={post.id}
                myProfile={myProfile}
                feedProfile={feedProfile}
                feedDetail={post}
              />
            ))
          : null} */}
      </FeedArea>
    </Wrapper>
  );
};

export default FeedContent;
