import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Post from "./Post";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 5px;
`;
const TimeLine = ({ posts }) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} post={post} /> // post 프롭스로 전달
      ))}
    </Wrapper>
  );
};

export default TimeLine;
