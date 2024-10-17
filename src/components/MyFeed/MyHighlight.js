import React from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StoryItem from "../Story/StoryItem";
import AddHighlight from "../Story/AddHighlight";

const Wrapper = styled.div`
  width: 100%;
  /* display: flex; */
`;

const HighlightArea = styled.div`
  /* border: 1px solid red; */
  /* width: 100%; */
  /* margin: 20px 70px; */
`;

const HighlightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  margin: 20px 70px;
  /* border: 1px solid blue; */

  @media screen and (max-width: 1000px) {
    gap: 20px;
    margin: 20px 50px;

    .storyFirstCircle {
      width: 68px;
      height: 68px;
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

  @media screen and (max-width: 430px) {
    margin: 20px 10px;

    .storyFirstCircle {
      width: 68px;
      height: 68px;
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
      </HighlightBox>
    </Wrapper>
  );
};

export default MyHighlight;
