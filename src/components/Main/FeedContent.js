import React, { useState } from "react";
import styled from "styled-components";
import TabBarBtn from "../Common/TabBarBtn";
import { FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import FeedItem from "./FeedItem";

const tabWidth = 340;

const Wrapper = styled.div`
  width: 100%;
`;

const FeedArea = styled.div`
  width: 680px;
  margin: 0 auto;
`;

const FeedTabBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--light-gray-color);
`;

const FeedTabBtn = styled.div`
  display: flex;
  height: 60px;
`;

const ActiveBorderArea = styled.div`
  width: 100%;
  height: 3px;
`;

const ActiveBorder = styled.div`
  width: 50%;
  height: 100%;
  background: var(--font-black-color);
  transition: transform 0.3s;
  ${({ $tabChange }) =>
    $tabChange === "recommend"
      ? `transform: translateX(0);`
      : `transform: translateX(100%);`}
`;

const FeedContent = () => {
  const [recommend, setRecommend] = useState(true);
  const [follow, setFollow] = useState(false);
  const [$tabChange, setTabChange] = useState("recommend");

  const recommendActive = () => {
    setRecommend(true);
    setFollow(false);
    setTabChange("recommend");
  };
  const followActive = () => {
    setRecommend(false);
    setFollow(true);
    setTabChange("follow");
  };

  return (
    <Wrapper>
      <FeedArea>
        <FeedTabBar>
          <ActiveBorderArea>
            <ActiveBorder $tabChange={$tabChange} />
          </ActiveBorderArea>
          <FeedTabBtn>
            <TabBarBtn
              onClick={recommendActive}
              width={tabWidth}
              iconCode={<FaRegStar />}
              text={"추천 게시물"}
              isActive={recommend}
            />
            <TabBarBtn
              onClick={followActive}
              width={340}
              iconCode={<FiUser />}
              text={"팔로우"}
              isActive={follow}
            />
          </FeedTabBtn>
        </FeedTabBar>
        <FeedItem />
      </FeedArea>
    </Wrapper>
  );
};

export default FeedContent;
