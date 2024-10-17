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
  width: 680px;
  height: 140px;
  margin: 0 auto;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 770px) {
    width: 430px;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
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
    if (!myProfile || !auth?.currentUser) return;

    const myUser = users.find((it) => it.uid === auth?.currentUser?.uid);

    if (!myUser) {
      console.error("현재 사용자에 대한 정보를 찾을 수 없습니다.");
      return;
    }

    const myUserId = myUser.userId;

    const userIdOfMyFollowing = myProfile.following
      .map((it) => {
        const user = users.find((user) => user.uid === it);
        return user ? user.userId : null;
      })
      .filter(Boolean);

    const storyDesc = storys
      .filter((it) => userIdOfMyFollowing.includes(it.userId))
      .map((story) => {
        const storyUser = users.find((it) => it.userId === story.userId);
        if (!storyUser) {
          console.error("스토리 사용자에 대한 정보를 찾을 수 없습니다.");
          return null;
        }

        const storyUserProfile = allProfile.find(
          (it) => it.uid === storyUser.uid
        );

        if (!storyUserProfile) {
          console.error("사용자 프로필을 찾을 수 없습니다.");
          return null;
        }

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
      .filter(Boolean)
      .sort((a, b) => b.active - a.active || b.date - a.date);

    setStoryDesc(storyDesc);
  }, [myProfile]);
  const itemWidth = 80;
  const itemGap = 20;

  useEffect(() => {
    if (ref.current) {
      const parentWidth = ref.current.clientWidth;
      const maxVisibleItems = Math.floor(parentWidth / (itemWidth + itemGap));
      const totalItems = storyDesc.length;

      setVisible(Math.max(0, Math.min(visible, totalItems - maxVisibleItems)));
    }
  }, [storyDesc]);

  const handleDragEnd = (event, info) => {
    const parentWidth = ref.current.clientWidth;
    const maxVisibleItems = Math.floor(parentWidth / (itemWidth + itemGap));
    const distanceMoved = info.offset.x / (itemWidth + itemGap);

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
          drag="x"
          dragConstraints={{
            left: -(
              (storyDesc.length -
                Math.floor(ref.current?.clientWidth / (itemWidth + itemGap))) *
              (itemWidth + itemGap)
            ),
            right: 0,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -visible * (itemWidth + itemGap) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
