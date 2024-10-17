import React, { useEffect, useState, useContext, useRef } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import StoryItem from "./StoryItem";
import Data from "../../data.json";
import { auth } from "../../utils/firebase";
import { motion } from "framer-motion";

const users = Data.user;
const storys = Data.story;

const Wrapper = styled.div`
  width: 68%;
  min-width: 680px;
  height: 140px;
  margin: 0 auto;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  @media screen and (max-width: 1024px) {
    min-width: 370px;
    gap: 19px;
  }

  @media screen and (max-width: 430px) {
    min-width: 350px;
    gap: 5px;
  }
`;

const StorySection = styled.div`
  flex: 1;
  overflow: hidden;
`;

const StoryGroup = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StoryContent = () => {
  const [visible, setVisible] = useState(0);
  const [storyDesc, setStoryDesc] = useState([]);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);
  const ref = useRef(null);

  useEffect(() => {
    if (!myProfile) return;

    const myUserId = users.find(
      (it) => it.uid === auth?.currentUser.uid
    ).userId;
    const userIdOfMyFollowing = myProfile.following.map(
      (it) => users.find((user) => user.uid === it).userId
    );

    const storyDesc = storys
      .filter((it) => userIdOfMyFollowing.includes(it.userId))
      .map((story) => {
        const storyUserUid = users.find((it) => it.userId === story.userId).uid;
        const storyUserProfile = allProfile.find(
          (it) => it.uid === storyUserUid
        );
        return {
          userId: storyUserProfile.userId,
          imgPath: storyUserProfile.profilePhoto,
          storys: story.storyHistory[0] || [],
          active: story.storyHistory[0]
            ? story.storyHistory[0].isView.includes(myUserId)
              ? 1
              : 0
            : 0,
          date: new Date(story.storyHistory[0].createDate).getTime(),
        };
      })
      .sort((a, b) => b.active - a.active || b.date - a.date);

    setStoryDesc(storyDesc);
  }, [myProfile]);

  // 부모 요소의 크기를 측정하여 dragConstraints 설정
  const itemWidth = 80; // StoryItem의 너비
  useEffect(() => {
    if (ref.current) {
      const parentWidth = ref.current.clientWidth;
      const maxVisibleItems = Math.floor(parentWidth / itemWidth);
      const totalItems = storyDesc.length;

      setVisible(Math.max(0, Math.min(visible, totalItems - maxVisibleItems))); // visible 상태를 업데이트
    }
  }, [storyDesc]);

  const handleDragEnd = (event, info) => {
    const parentWidth = ref.current.clientWidth;
    const maxVisibleItems = Math.floor(parentWidth / itemWidth);
    const distanceMoved = info.offset.x / itemWidth; // 이동한 거리

    setVisible((prev) => {
      const newVisible = Math.round(prev - distanceMoved);
      return Math.max(
        0,
        Math.min(newVisible, storyDesc.length - maxVisibleItems)
      );
    });
  };

  return (
    <Wrapper>
      <StorySection ref={ref}>
        <StoryGroup
          drag="x" // x축으로 드래그 가능
          dragConstraints={{
            left: -(
              (storyDesc.length -
                Math.floor(ref.current?.clientWidth / itemWidth)) *
              itemWidth
            ),
            right: 0,
          }} // 드래그 제약 조건
          onDragEnd={handleDragEnd} // 드래그 끝났을 때 호출되는 핸들러
          style={{ x: -visible * itemWidth }} // 현재 visible 인덱스를 기반으로 x 위치 조정
        >
          {storyDesc.map((it, idx) => (
            <StoryItem
              key={idx}
              userId={it.userId}
              imgPath={it.imgPath}
              type={it.active > 0 ? "active" : "inactive"}
            />
          ))}
        </StoryGroup>
      </StorySection>
    </Wrapper>
  );
};

export default StoryContent;
