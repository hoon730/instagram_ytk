import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import TimeLine from "../components/Detail/TimeLine";
import { StateContext } from "../App";

import {
  collection,
  query,
  limit,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import MbHeader from "../components/Detail/MbHeader";

const Wrapper = styled.div`
  width: 934px;
  min-height: 100vh;
  height: fit-content;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 630px) {
    width: 430px;
    margin-bottom: 80px;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const MyFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  useEffect(() => {
    if (!myProfile || !myProfile.uid) {
      return;
    }

    const feedUid = userId
      ? allProfile.find((it) => it.userId === userId).uid
      : myProfile.uid;

    let unsubscribe;
    const fetchPosts = async () => {
      const postQuery = query(
        collection(db, "feed"),
        where("uid", "==", feedUid),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(postQuery, (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => {
          const feedProfile = allProfile.find(
            (it) => it.uid === doc.data().uid
          );
          const {
            content,
            createdAt,
            hastage,
            like,
            location,
            tagUser,
            uid,
            imgPath,
            type,
          } = doc.data();
          return {
            id: doc.id,
            content,
            createdAt,
            hastage,
            like,
            location,
            tagUser,
            uid,
            imgPath,
            type,
            profile: feedProfile,
          };
        });
        setPosts(fetchedPosts); // posts 상태 업데이트
      });
    };
    fetchPosts();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <MbHeader />
      <MyPic posts={posts} userId={userId} />
      <MyProfile userId={userId} />
      <MyHighlight />
      <MyFeedTabBar />
      <TimeLine posts={posts} />
    </Wrapper>
  );
};

export default MyFeed;
