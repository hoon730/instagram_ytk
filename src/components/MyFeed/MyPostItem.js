import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${({ size }) => `${size || 308}`}px;
  height: ${({ size }) => `${size || 308}`}px;
  border-radius: 10px;

  @media screen and (max-width: 780px) {
    width: 100%;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const ImgBox = styled.div`
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
    <Wrapper onClick={showFeed} size={size}>
      <ImgBox>
        <Img src={url} alt="postphoto" />
      </ImgBox>
    </Wrapper>
  );
};

export default MyPostItem;
