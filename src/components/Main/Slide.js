import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Slides = styled.ul`
  width: ${({ $slideLength }) => 100 * ($slideLength || 1)}%;
  height: 100%;
  display: flex;
  transform: translateX(
    ${({ $visible, $slideLength }) =>
      `${-$visible * (100 / $slideLength) || 0}%`}
  );
  transition: transform 0.5s;
`;

const SlideItem = styled.li`
  width: 100%;
  height: 100%;
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
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
`;

const SlideButton = styled.span`
  width: 35px;
  height: 35px;
  cursor: pointer;
  &.prev {
    transform: rotate(180deg);
    visibility: ${({ $visible }) => ($visible === 0 ? "hidden" : "visible")};
  }
  &.next {
    visibility: ${({ $visible, $limit }) =>
      $visible === $limit ? "hidden" : "visible"};
  }
  & img {
    width: inherit;
    height: inherit;
  }
  @media screen and (max-width: 1024px) {
    width: 25px;
    height: 25px;
  }
`;

const SlideButtonImg = () => {
  return (
    <>
      <img src={"/images/slide-button.svg"} />
    </>
  );
};

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
  const [visible, setVisible] = useState(0);
  const moveSlide = (num) => {
    setVisible(num + visible);
  };

  return (
    <Wrapper>
      <Slides $visible={visible} $slideLength={imgPath.length}>
        {imgPath.map((it, idx) => (
          <SlideItem key={idx}>
            <img src={it} />
          </SlideItem>
        ))}
      </Slides>
      {imgPath.length > 1 ? (
        <>
          <SlideButtons>
            <SlideButton
              className="prev"
              $visible={visible}
              onClick={() => moveSlide(-1)}
            >
              <SlideButtonImg />
            </SlideButton>
            <SlideButton
              className="next"
              $visible={visible}
              $limit={imgPath.length - 1}
              onClick={() => moveSlide(1)}
            >
              <SlideButtonImg />
            </SlideButton>
          </SlideButtons>
          <SlidePager>
            {imgPath.map((it, idx) => (
              <Pager
                key={idx}
                className={idx === visible ? "active" : null}
                onClick={() => setVisible(idx)}
              ></Pager>
            ))}
          </SlidePager>
        </>
      ) : null}
    </Wrapper>
  );
};

export default Slide;
