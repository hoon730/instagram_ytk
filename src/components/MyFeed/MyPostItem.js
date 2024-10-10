import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 33%;
  overflow: hidden;

  @media screen and (max-width: 780px) {
    width: 100%;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const MyPostItem = ({ size, url, onClick }) => {
  const showFeed = () => {
    onClick();
  };

  return (
    <Wrapper onClick={showFeed}>
      <ImgBox>
        <Img src={url} alt="postphoto" />
      </ImgBox>
    </Wrapper>
  );
};

export default MyPostItem;
