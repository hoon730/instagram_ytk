import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${({ size }) => `${size || 305}`}px;
  height: ${({ size }) => `${size || 305}`}px;
  /* border: 1px solid lightgray; */
  border-radius: 10px;

  @media screen and (max-width: 390px) {
    width: 140px;
    height: 140px;
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

<<<<<<< HEAD
const MyPostItem = ({ url, onClick }) => {
=======
const MyPostItem = ({ size, url, onClick }) => {
>>>>>>> 7872f53976050a526c46b730ad247431191168f7
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
