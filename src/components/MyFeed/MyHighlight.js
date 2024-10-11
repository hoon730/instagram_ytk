import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import StoryItem from "../Story/StoryItem";
import AddHighlight from "../Story/AddHighlight";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* border: 1px solid purple; */
`;

const HighlightBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  margin: 20px 70px;

  @media screen and (max-width: 780px) {
    margin: 20px 50px;

    .ActivationArea {
      width: 50px;
      height: 50px;
      border: 7px solid var(--bg-white-color);
    }

    .storyThirdCircle {
      width: 50px;
      height: 50px;
    }
  }

  @media screen and (max-width: 430px) {
    margin: 20px 50px;
  }
`;

const storys = [
  {
    userId: "l",
    imgPath: "/images/postImgs/user1/hicover1.jpg",
  },
  { userId: "u", imgPath: "/images/postImgs/user1/hicover2.jpg" },
  { userId: "c", imgPath: "/images/postImgs/user1/hicover3.jpg" },
  { userId: "k", imgPath: "/images/postImgs/user1/hicover4.jpg" },
];

const MyHighlight = () => {
  return (
    <Wrapper>
      <HighlightBox>
        {storys.map((it, idx) => (
          <StoryItem
            key={idx}
            userId={it.userId}
            imgPath={it.imgPath}
            type={"inactive"}
          />
        ))}
        <AddHighlight size={80} />
      </HighlightBox>
    </Wrapper>
  );
};

export default MyHighlight;
