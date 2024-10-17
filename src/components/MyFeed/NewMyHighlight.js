import React from "react";
import styled from "styled-components";
import StoryItem from "../Story/StoryItem";

const Wrapper = styled.div`
  border-bottom: 1px solid lightgray;
`;

const HighlightBox = styled.div`
  /* border: 1px solid blue; */
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 70px;
  gap: 50px;

  @media screen and (max-width: 900px) {
  }

  @media screen and (max-width: 430px) {
    width: 100%;
    gap: 20px;
    padding: 20px 15px;

    .storyFirstCircle {
      width: 66px;
      height: 66px;
    }

    .storySecondCircle {
      width: 60px;
      height: 60px;
    }

    .storyThirdCircle {
      width: 60px;
      height: 60px;
    }
  }
`;

const storys = [
  { userId: "l", imgPath: "/images/postImgs/user1/hicover1.jpg" },
  { userId: "u", imgPath: "/images/postImgs/user1/hicover2.jpg" },
  { userId: "c", imgPath: "/images/postImgs/user1/hicover3.jpg" },
  { userId: "k", imgPath: "/images/postImgs/user1/hicover4.jpg" },
];

const NewMyHighlight = () => {
  return (
    <>
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
        </HighlightBox>
      </Wrapper>
    </>
  );
};

export default NewMyHighlight;
