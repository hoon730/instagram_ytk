import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import TimeLine from "../components/Detail/TimeLine";

import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const Wrapper = styled.div`
  width: 934px;
  min-height: 100vh;
  height: fit-content;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};

  @media screen and (max-width: 780px) {
    width: 100%;
  }
`;

const MyFeed = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [myFeeds, setMyFeed] = useState([]);
  const [postsWithProfiles, setPostsWithProfiles] = useState([]);

  useEffect(() => {
    const userUid = auth.currentUser?.uid;
    if (userUid) {
      const getMyProfile = async (uid) => {
        const profileQuery = query(
          collection(db, "profile"),
          where("uid", "==", uid),
          limit(1)
        );
        const profileSnapshot = await getDocs(profileQuery);

        if (!profileSnapshot.empty) {
          const profileData = profileSnapshot.docs[0].data();
          setMyProfile(profileData);
        }
      };

      getMyProfile(userUid);
    }
  }, []);

  useEffect(() => {
    if (myProfile) {
      const getmyFeed = async (myProfile) => {
        const feedsQuery = query(
          collection(db, "feed"),
          where("uid", "==", myProfile.uid),
          orderBy("createdAt", "desc"),
          limit(15)
        );

        const myFeedSnapshot = await getDocs(feedsQuery);

        if (!myFeedSnapshot.empty) {
          const myFeedData = myFeedSnapshot.docs.map((doc) => doc.data());
          setMyFeed((prevFeed) => [...prevFeed, ...myFeedData]);
        }
      };
      getmyFeed(myProfile);
    }
  }, [myProfile]);

  useEffect(() => {
    let postsUnsubscribe = null;

    if (myProfile && myProfile.following) {
      const getPosts = (following) => {
        const postsQuery = query(
          collection(db, "feed"),
          where("uid", "in", following),
          where("type", "!=", null),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        // 실시간 구독
        postsUnsubscribe = onSnapshot(postsQuery, async (snapshot) => {
          const postDocs = snapshot.docs;

          // posts 배열에 포함된 uid와 profile의 uid를 맞춰 profile 정보도 가져오기
          const posts = await Promise.all(
            postDocs.map(async (doc) => {
              const postData = doc.data();

              // 각 post의 uid에 맞는 profile 가져오기
              const profileQuery = query(
                collection(db, "profile"),
                where("uid", "==", postData.uid),
                limit(1)
              );
              const profileSnapshot = await getDocs(profileQuery);

              let profileData = {};
              if (!profileSnapshot.empty) {
                profileData = profileSnapshot.docs[0].data();
              }

              return {
                id: doc.id,
                ...postData,
                profile: profileData, // profile 데이터를 post에 추가
              };
            })
          );

          setPostsWithProfiles(posts); // 프로필과 결합된 posts 배열 설정
        });
      };

      getPosts(myProfile.following);
    }

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      if (postsUnsubscribe) {
        postsUnsubscribe();
      }
    };
  }, [myProfile]); // myProfile이 있을 때만 실행

  return (
    <Wrapper>
      <MyPic myProfile={myProfile} myFeeds={myFeeds} />
      <MyProfile myProfile={myProfile} />
      <MyHighlight />
      <MyFeedTabBar />
      <TimeLine myFeeds={myFeeds} myProfile={myProfile} />
    </Wrapper>
  );
};

export default MyFeed;
