import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 33%;
  overflow: hidden;
`;
const MediaBox = styled.div`
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
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MyFeed = () => {
  return (
    <Wrapper>
      <MediaBox>
        <Img />
      </MediaBox>
    </Wrapper>
  );
};

export default MyFeed;
