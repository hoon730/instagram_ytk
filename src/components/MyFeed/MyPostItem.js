import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 305px;
  height: 305px;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const MyPostItem = ({ url }) => {
  return (
    <Wrapper>
      <ImgBox>
        <Img src={url} alt="postphoto" />
      </ImgBox>
    </Wrapper>
  );
};

export default MyPostItem;
