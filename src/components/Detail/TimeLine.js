import React, { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from "firebase/firestore";
import styled from "styled-components";
import { db } from "../../utils/firebase";
import Post from "./Post";

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
  gap: 10px;
  margin-bottom: 10px;
  /* overflow-y: scroll; */
`;

const TimeLine = () => {
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
