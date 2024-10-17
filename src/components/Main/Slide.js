import React, { useState, useRef } from "react";
import styled from "styled-components";
import { videoArr } from "../../utils/utils";
import { extractExtension } from "../../utils/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .react-multiple-carousel__arrow {
    display: none;
  }
  .react-multi-carousel-track {
    height: 100%;
  }
`;

const SlideItem = styled.div`
  width: 100%;
  height: 100%;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-user-drag: none;
  }
`;

const SlideButtons = styled.div`
  width: 100%;
  padding: 0 22px;
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
  &.prev {
    transform: rotate(180deg);
  }
`;

const SlideButton = styled.span`
  width: 35px;
  height: 35px;
  cursor: pointer;
  visibility: ${({ $visible, $limit }) =>
    $visible === 0 ? "hidden" : "visible"};

  &.prev {
    rotate: calc(180deg);
    visibility: ${({ $visible, $limit }) =>
      $visible === $limit ? "hidden" : "visible"};
  }

  &.next {
    visibility: ${({ $visible, $limit }) =>
      $visible === $limit ? "hidden" : "visible"};
  }

  img {
    width: inherit;
    height: inherit;
  }

  @media screen and (max-width: 1024px) {
    width: 25px;
    height: 25px;
  }
`;

const SlideButtonImg = () => (
  <img src={"/images/slide-button.svg"} alt="Slide Button" />
);

const SlidePager = styled.div`
  position: absolute;
  bottom: 22px;
  display: flex;
  gap: 6px;
  left: 50%;
  transform: translateX(-50%);
`;

const Pager = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--bg-white-color);
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s;

  &.active {
    opacity: 1;
  }
`;

const Slide = ({ imgPath }) => {
  const imageArray = Array.isArray(imgPath) ? imgPath : [imgPath];
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index
  const carouselRef = useRef(null); // Create a ref for the Carousel

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      carouselRef.current.goToSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < imageArray.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      carouselRef.current.goToSlide(currentSlide + 1);
    }
  };

  const handlePagerClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goToSlide(index); // Navigate to the clicked slide
  };

  // const Slides = styled(Carousel)`
  //   & > ul {
  //     ${({ $maxValue }) =>
  //       $maxValue ? `width: ${$maxValue * 100}% important` : "width: 100%;"}
  //   }
  // `;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Wrapper>
      <Carousel
        $maxValue={imageArray.length}
        ref={carouselRef}
        responsive={responsive}
        arrows={false}
        afterChange={(previousSlide, { currentSlide }) =>
          setCurrentSlide(currentSlide)
        }
        className="carousel"
      >
        {imageArray.map((it, idx) => (
          <SlideItem key={idx}>
            {videoArr.includes(extractExtension(it)) ? (
              <video
                src={it}
                autoPlay
                muted
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "#000",
                }}
              />
            ) : (
              <img src={it} alt={`Slide ${idx}`} />
            )}
          </SlideItem>
        ))}
      </Carousel>

      {imageArray.length > 1 && (
        <>
          <SlideButtons>
            <SlideButton
              className="prev"
              $visible={currentSlide}
              onClick={handlePrev}
            >
              <SlideButtonImg />
            </SlideButton>
            <SlideButton
              className="next"
              $visible={currentSlide}
              $limit={imageArray.length - 1}
              onClick={handleNext}
            >
              <SlideButtonImg />
            </SlideButton>
          </SlideButtons>
          <SlidePager>
            {imageArray.map((_, idx) => (
              <Pager
                key={idx}
                className={idx === currentSlide ? "active" : ""}
                onClick={() => handlePagerClick(idx)}
              />
            ))}
          </SlidePager>
        </>
      )}
    </Wrapper>
  );
};

export default Slide;
