import React from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StoryItem from "../Story/StoryItem";

const Wrapper = styled.div`
  width: 100%;
`;

const HighlightBox = styled.div`
  gap: 40px;
  margin: 20px 70px;
  /* border: 1px solid blue; */

  @media screen and (max-width: 1000px) {
    gap: 20px;
    margin: 15px 50px;

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

  @media screen and (max-width: 630px) {
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

  @media screen and (max-width: 430px) {
    gap: 10px;
  }

  .react-multiple-carousel__arrow {
    display: none;
  }
`;

const storys = [
  { userId: "l", imgPath: "/images/postImgs/user1/hicover1.jpg" },
  { userId: "u", imgPath: "/images/postImgs/user1/hicover2.jpg" },
  { userId: "c", imgPath: "/images/postImgs/user1/hicover3.jpg" },
  { userId: "k", imgPath: "/images/postImgs/user1/hicover4.jpg" },
  { userId: "y", imgPath: "/images/postImgs/user1/hicover5.jpg" },
  { userId: "🍀", imgPath: "/images/postImgs/user1/hicover6.jpg" },
];

const MyHighlight = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 900, min: 780 },
      items: 6,
    },
    tablet2: {
      breakpoint: { max: 780, min: 0 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 430, min: 0 },
      items: 4,
    },
  };

  return (
    <Wrapper>
      <HighlightBox>
        <Carousel responsive={responsive}>
          {storys.map((it, idx) => (
            <StoryItem
              key={idx}
              userId={it.userId}
              imgPath={it.imgPath}
              type={"inactive"}
            />
          ))}
        </Carousel>
      </HighlightBox>
    </Wrapper>
  );
};

export default MyHighlight;
