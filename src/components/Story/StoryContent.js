import React, { useEffect, useState, useContext } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import StoryItem from "./StoryItem";
import SlideButton from "../Common/SlideButton";
import Data from "../../data.json";
import { auth } from "../../utils/firebase";

const users = Data.user;
const storys = Data.story;

const Wrapper = styled.div`
  width: 68%;
  min-width: 680px;
  height: 180px;
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

const StoryGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  transform: translateX(${({ $visible }) => `${-$visible * 100 || 0}px`});
  transition: transform 0.5s;
`;

// const storys1 = [
//   {
//     userId: "user01",
//     imgPath: "/images/userImgs/user123456/profile-photo.jpg",
//   },
//   { userId: "user02", imgPath: "/images/userImgs/user123456/feedDetail.jpg" },
//   { userId: "user03", imgPath: "/images/userImgs/user123456/followed_1.jpg" },
//   { userId: "user04", imgPath: "/images/userImgs/user123456/followed_2.jpg" },
//   { userId: "user05", imgPath: "/images/userImgs/user123456/followed_3.jpg" },
//   { userId: "user06", imgPath: "/images/userImgs/user123456/followed_4.jpg" },
//   { userId: "user07", imgPath: "/images/userImgs/user123456/followed_5.jpg" },
//   { userId: "user08", imgPath: "/images/userImgs/user123456/userdetail_1.jpg" },
//   { userId: "user09", imgPath: "/images/userImgs/user123456/userdetail_2.jpg" },
//   { userId: "user10", imgPath: "/images/userImgs/user123456/userdetail_3.jpg" },
//   {
//     userId: "user11",
//     imgPath: "/images/userImgs/user123456/profile-photo2.jpg",
//   },
// ];

const StoryContent = () => {
  const [visible, setVisible] = useState(0);
  const [storyDesc, setStoryDesc] = useState(null);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  useEffect(() => {
    if (!myProfile) return;

    const myUserId = users.find(
      (it) => it.uid === auth?.currentUser.uid
    ).userId;
    const userIdOfMyFollowing = myProfile.following.map((it) => {
      return users.find((user) => user.uid === it).userId;
    });

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
      .sort((a, b) => {
        return b.active - a.active || b.date - a.date;
      });
    setStoryDesc(storyDesc);
  }, [myProfile]);

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
      <StorySection>
        <StoryGroup $visible={visible}>
          {/* {storys1.map((it, idx) => (
            <StoryItem
              key={idx}
              userId={it.userId}
              imgPath={it.imgPath}
              type={"active"}
            />
          ))} */}
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
