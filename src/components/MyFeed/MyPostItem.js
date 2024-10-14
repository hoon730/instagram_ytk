import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  ${({ page }) =>
    page === "search" || page === "explore"
      ? "padding-top: 100%;"
      : page === "reels"
      ? "padding-top: 178%"
      : "padding-top: 33%;"}
`;

const Box = styled.div`
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
  border-radius: 5px;
  object-fit: contain;
  background: #000;
`;

const MyPostItem = ({ size, url, onClick, page }) => {
  const showFeed = () => {
    onClick();
  };

  return (
    <Wrapper onClick={showFeed} page={page}>
      <Box>
        {page === "reels" ? (
          <Video src={url} alt="postvideo" />
        ) : (
          <Img src={url} alt="postphoto" />
        )}
      </Box>
    </Wrapper>
  );
};

export default MyPostItem;
