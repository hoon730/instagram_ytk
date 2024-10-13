import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";

import {
  collection,
  query,
  limit,
  onSnapshot,
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
const TimeLine = ({ myFeeds, myProfile }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let unsubscribe;
    const fetchPosts = async () => {
      const postQuery = query(
        collection(db, "contents"),
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
        <Post key={post.id} post={post} /> // post 프롭스로 전달
      ))}
      {myProfile &&
        myFeeds.map((myFeed, idx) => (
          <Post key={idx} myFeed={myFeed} myProfile={myProfile} />
        ))}
    </Wrapper>
  );
};

export default TimeLine;
