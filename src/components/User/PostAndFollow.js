import React, { useState } from "react";
import styled from "styled-components";
import Follower from "../Detail/Follower";

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
  const [onpenFollower, setOpenFollower] = useState(false);
  const [onpenFollowing, setOpenFollowing] = useState(false);

  const [clickBtn, setClickBtn] = useState("");

  const getWhichText = (text) => {
    setClickBtn(text);
  };

  const handleOnFollow = () => {
    setOpenFollower((prev) => !prev);
  };

  const handleOnFollowing = () => {
    setOpenFollowing((prev) => !prev);
  };

  return (
    <Wrapper padding={padding} className="post_follow">
      <NumberingBox>
        <span>{posting}</span>
        <span>게시물</span>
      </NumberingBox>
      <NumberingBox
        onClick={() => {
          getWhichText("팔로워");
          handleOnFollow();
        }}
      >
        <span>{follower}</span>
        <span>팔로워</span>
      </NumberingBox>
      <NumberingBox
        onClick={() => {
          getWhichText("팔로잉");
          handleOnFollow();
        }}
      >
        <span>{following}</span>
        <span>팔로잉</span>
      </NumberingBox>
      {onpenFollower ? (
        <Follower setOpenFollower={setOpenFollower} clickBtn={clickBtn} />
      ) : onpenFollowing ? (
        <Follower setOpenFollowing={setOpenFollowing} clickBtn={clickBtn} />
      ) : null}
    </Wrapper>
  );
};

export default PostAndFollow;
