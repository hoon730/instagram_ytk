import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${({ size }) => `${size || 305}`}px;
  height: ${({ size }) => `${size || 305}`}px;
  /* border: 1px solid lightgray; */
  border-radius: 10px;
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

const MyPostItem = ({ size, url }) => {
  return (
    <Wrapper size={size}>
      <ImgBox>
        <Img src={url} alt="postphoto" />
      </ImgBox>
    </Wrapper>
  );
};

export default MyPostItem;
