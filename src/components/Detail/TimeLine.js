import React, { useEffect, useState } from "react";
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  /* overflow-y: scroll; */
`;
const TimeLine = ({ myProfile }) => {
  const [posts, setPosts] = useState([]);

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
      {posts.map((post) => (
        <Post key={post.id} post={post} myProfile={myProfile} /> // post 프롭스로 전달
      ))}
    </Wrapper>
  );
};

export default TimeLine;
