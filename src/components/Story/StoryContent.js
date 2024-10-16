import React, { useEffect, useState, useContext, useRef } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import StoryItem from "./StoryItem";
import SlideButton from "../Common/SlideButton";
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
  const [storyDesc, setStoryDesc] = useState(null);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const ref = useRef(null); // 부모 요소 참조

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
  useEffect(() => {
    if (ref.current) {
      const parentWidth = ref.current.clientWidth; // 부모 요소의 너비
      const itemWidth = 90;
      const maxVisibleItems = Math.floor(parentWidth / itemWidth); // 최대 보이는 아이템 수
      const totalItems = storyDesc ? storyDesc.length : 0;

      // 드래그 제약 조건 계산
      setConstraints({
        left: -(totalItems - maxVisibleItems) * itemWidth, // 왼쪽으로 드래그 가능한 최대 거리
        right: 0, // 오른쪽은 0
      });
    }
  }, [storyDesc]);

  const moveSlide = (num) => {
    setVisible(num + visible);
  };

  return (
    <Wrapper>
      <SlideButton
        type={"left"}
        onClick={() => moveSlide(-1)}
        visible={visible}
        limit={storyDesc && storyDesc.length}
      />
      <StorySection ref={ref}>
        <StoryGroup
          drag="x"
          dragConstraints={constraints}
          whileTap={{ cursor: "grabbing" }}
        >
          {storyDesc &&
            storyDesc.map((it, idx) => (
              <StoryItem
                key={idx}
                userId={it.userId}
                imgPath={it.imgPath}
                type={it.active > 0 ? "active" : "inactive"}
              />
            ))}
        </StoryGroup>
      </StorySection>
      <SlideButton
        type={"right"}
        onClick={() => moveSlide(1)}
        visible={visible}
        limit={storyDesc && storyDesc.length}
      />
    </Wrapper>
  );
};

export default StoryContent;
