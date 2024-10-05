import React, { useState } from "react";
import TabBarBtn from "../Common/TabBarBtn";
import styled from "styled-components";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { TbUserSquare } from "react-icons/tb";

const Wrapper = styled.div`
  width: 936px;
  height: 70px;
  /* border: 1px solid lightgray; */
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ActiveBorderArea = styled.div`
  width: 100%;
  height: 3px;
`;

const ActiveBorder = styled.div`
  width: 33%;
  height: 100%;
  background: var(--font-black-color);
  transition: transform 0.3s;
  ${({ xVal }) => `transform: translateX(${xVal}%);`}
`;

const tabWidth = 312;

const MyPostTabBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--light-gray-color);
  margin-bottom: 10px;
`;

const MyFeedTabBar = () => {
  const [posts, setPosts] = useState(true);
  const [reels, setReels] = useState(false);
  const [tagged, setTagged] = useState(false);
  const [xVal, setXVal] = useState(0);

  const postsActive = () => {
    setPosts(true);
    setReels(false);
    setTagged(false);
    setXVal(0);
  };
  const reelsActive = () => {
    setPosts(false);
    setReels(true);
    setTagged(false);
    setXVal(100);
  };
  const taggedActive = () => {
    setPosts(false);
    setReels(false);
    setTagged(true);
    setXVal(200);
  };

  return (
    <Wrapper>
      <ActiveBorderArea>
        <ActiveBorder xVal={xVal} />
      </ActiveBorderArea>
      <MyPostTabBox>
        <TabBarBtn
          onClick={postsActive}
          width={tabWidth}
          iconCode={<BsGrid3X3Gap />}
          text={"게시물"}
          isActive={posts}
        />
        <TabBarBtn
          onClick={reelsActive}
          width={tabWidth}
          iconCode={<BiMoviePlay />}
          text={"릴스"}
          isActive={reels}
        />
        <TabBarBtn
          onClick={taggedActive}
          width={tabWidth}
          iconCode={<TbUserSquare />}
          text={"태그"}
          isActive={tagged}
        />
      </MyPostTabBox>
    </Wrapper>
  );
};

export default MyFeedTabBar;
