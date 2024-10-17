import React, { useState } from "react";
import TabBarBtn from "../Common/TabBarBtn";
import styled from "styled-components";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { TbUserSquare } from "react-icons/tb";

const Wrapper = styled.div`
  width: 934px;
  height: 70px;
  border-radius: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const ActiveBorderArea = styled.div`
  width: 100%;
  height: 3px;
`;

const ActiveBorder = styled.div`
  width: 33%;
  height: 100%;
  background: ${({ theme }) => theme.fontColor};
  transition: transform 0.3s;
  ${({ $isOn }) => `transform: translateX(${$isOn}%);`}
`;

const tabWidth = 312;

const MyPostTabBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 10px;
`;

const MyFeedTabBar = () => {
  const [posts, setPosts] = useState(true);
  const [reels, setReels] = useState(false);
  const [tagged, setTagged] = useState(false);
  const [isOn, setIsOn] = useState(0);

  const postsActive = () => {
    setPosts(true);
    setReels(false);
    setTagged(false);
    setIsOn(0);
  };
  const reelsActive = () => {
    setPosts(false);
    setReels(true);
    setTagged(false);
    setIsOn(100);
  };
  const taggedActive = () => {
    setPosts(false);
    setReels(false);
    setTagged(true);
    setIsOn(200);
  };

  return (
    <Wrapper>
      <ActiveBorderArea>
        <ActiveBorder $isOn={isOn} />
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
