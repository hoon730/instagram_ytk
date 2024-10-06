import React, { useState } from "react";
import styled from "styled-components";
import StoryItem from "./StoryItem";
import SlideButton from "../Common/SlideButton";

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

  @media screen and (max-width: 1330px) {
    min-width: 370px;
    gap: 19px;
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

const storys = [
  {
    userId: "user01",
    imgPath: "/images/userImgs/user123456/profile-photo.jpg",
  },
  { userId: "user02", imgPath: "/images/userImgs/user123456/feedDetail.jpg" },
  { userId: "user03", imgPath: "/images/userImgs/user123456/followed_1.jpg" },
  { userId: "user04", imgPath: "/images/userImgs/user123456/followed_2.jpg" },
  { userId: "user05", imgPath: "/images/userImgs/user123456/followed_3.jpg" },
  { userId: "user06", imgPath: "/images/userImgs/user123456/followed_4.jpg" },
  { userId: "user07", imgPath: "/images/userImgs/user123456/followed_5.jpg" },
  { userId: "user08", imgPath: "/images/userImgs/user123456/userdetail_1.jpg" },
  { userId: "user09", imgPath: "/images/userImgs/user123456/userdetail_2.jpg" },
  { userId: "user10", imgPath: "/images/userImgs/user123456/userdetail_3.jpg" },
  {
    userId: "user11",
    imgPath: "/images/userImgs/user123456/profile-photo2.jpg",
  },
];

const StoryContent = () => {
  const [visible, setVisible] = useState(0);
  const moveSlide = (num) => {
    setVisible(num + visible);
  };

  return (
    <Wrapper>
      <SlideButton
        type={"left"}
        onClick={() => moveSlide(-1)}
        visible={visible}
        limit={storys.length - 6}
      />
      <StorySection>
        <StoryGroup $visible={visible}>
          {storys.map((it, idx) => (
            <StoryItem key={idx} userId={it.userId} imgPath={it.imgPath} />
          ))}
        </StoryGroup>
      </StorySection>
      <SlideButton
        type={"right"}
        onClick={() => moveSlide(1)}
        visible={visible}
        limit={storys.length - 6}
      />
    </Wrapper>
  );
};

export default StoryContent;
