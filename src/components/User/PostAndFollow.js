import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: ${({ padding }) => (padding ? `${padding}` : "10px")};
  color: ${({ theme }) => theme.fontColor};
`;

const NumberingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:first-child {
    cursor: auto;
  }

  span {
    text-align: center;
    font-size: var(--font-14);
    font-weight: var(--font-regular);
    color: ${({ theme }) => theme.fontColor};
    &:first-child {
      font-weight: var(--font-bold);
      font-size: var(--font-16);
    }
  }
`;

const PostAndFollow = ({
  posting,
  follower,
  following,
  padding,
  myProfile,
}) => {
  return (
    <Wrapper padding={padding} className="post_follow">
      <NumberingBox>
        <span>{posting}</span>
        <span>게시물</span>
      </NumberingBox>
      <NumberingBox>
        <span>{follower}</span>
        <span>팔로워</span>
      </NumberingBox>
      <NumberingBox>
        <span>{following}</span>
        <span>팔로잉</span>
      </NumberingBox>
    </Wrapper>
  );
};

export default PostAndFollow;
