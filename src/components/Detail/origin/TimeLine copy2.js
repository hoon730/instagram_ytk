import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Post from "./Post";

import {
  collection,
  query,
  limit,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { StateContext } from "../../App";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 5px;
`;
const TimeLine = () => {
  const [posts, setPosts] = useState([]);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  useEffect(() => {
    if (!myProfile || !myProfile.uid) {
      return;
    }

    let unsubscribe;
    const fetchPosts = async () => {
      const postQuery = query(
        collection(db, "feed"),
        where("uid", "==", myProfile.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(postQuery, (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => {
          const feedProfile = allProfile.find((it) => it.uid === doc.data().uid);
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
            profile: feedProfile
          };
        });
        setPosts(fetchedPosts); // posts 상태 업데이트
      });
    };
    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [myProfile]);
  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} post={post} /> // post 프롭스로 전달
      ))}
    </Wrapper>
  );
};

export default TimeLine;
