import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 25px 0;
`;

const NumberingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  span {
    text-align: center;
    font-size: var(--font-size-14);
    font-weight: var(--font-regular);
    color: ${({ theme }) => theme.fontColor};
    &:first-child {
      font-weight: var(--font-bold);
      font-size: var(--font-size-16);
    }
  }
`;

const PostAndFollow = ({ posting, follower, following }) => {
  return (
    <Wrapper>
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
