import React from "react";
import styled from "styled-components";
import { extractExtension, videoArr } from "../../utils/utils";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  border-radius: var(--border-radius-8);
  ${({ page }) =>
    page === "search" || page === "explore"
      ? "padding-top: 100%;"
      : page === "reels"
      ? "padding-top: 178%;"
      : "padding-top: 33%;"}
  cursor: pointer;
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
  object-fit: cover;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  ${({ page }) =>
    page === "search" || page === "explore"
      ? "object-fit: cover;"
      : "object-fit: contain;"}
  background: #000;
`;

const MyPostItem = ({ size, url, page, onClick }) => {
  return (
    <Wrapper page={page}>
      <Box>
        {url &&
        Array.isArray(url) &&
        url.length > 0 &&
        videoArr.includes(extractExtension(url[0])) ? (
          <Video
            onClick={onClick}
            src={url[0]}
            muted
            alt="postvideo"
            page={page}
          />
        ) : (
          <Img onClick={onClick} src={url[0]} alt="postimg" />
        )}
      </Box>
    </Wrapper>
  );
};

export default MyPostItem;
