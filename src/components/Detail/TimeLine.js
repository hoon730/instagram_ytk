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

export const IPost = {
  id: String,
  createdAt: Number,
  photo: String,
  video: String,
  post: String,
  userId: String,
  userName: String,
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  /* overflow-y: scroll; */
`;

const TimeLine = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [posts, setPosts] = useState([]);

  const onClick = () => {
    setIsClicked((current) => !current);
  };

  useEffect(() => {
    let unsubscribe;
    const fetchPosts = async () => {
      const postQuery = query(
        collection(db, "contents"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = await onSnapshot(postQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { createdAt, photo, video, post, userId, userName } =
            doc.data();
          return {
            id: doc.id,
            createdAt,
            photo,
            video,
            post,
            userId,
            userName,
          };
        });
        setPosts(posts);
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
        <Post key={post.id} {...post} />
      ))}
    </Wrapper>
  );
};

export default TimeLine;
