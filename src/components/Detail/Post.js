import React, { useState } from "react";
import styled from "styled-components";
import ClickMyFeed from "./ClickMyFeed";
import { extractExtension, videoArr } from "../../utils/utils";

const Wrapper = styled.div`
  width: 305px;
  height: 305px;
  border-radius: var(--border-radius-8);
  overflow: hidden;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Post = ({ myProfile, post }) => {
  const [isClicked, setIsClicked] = useState(false);

  const showFeed = () => {
    setIsClicked((current) => !current);
  };

  return (
    <>
      <Wrapper onClick={showFeed}>
        {post && post.imgPath ? (
          Array.isArray(post.imgPath) ? (
            post.imgPath.map((item, idx) =>
              videoArr.includes(extractExtension(item)) ? (
                <Video key={idx} src={item} muted />
              ) : (
                <Img key={idx} src={item} />
              )
            )
          ) : null
        ) : post.type === "img" ? (
          <Img src={post.imgPath} />
        ) : post.type === "reels" ? (
          <Video src={post.imgPath} muted />
        ) : null}
      </Wrapper>
      {isClicked ? (
        <ClickMyFeed myProfile={myProfile} post={post} onClick={showFeed} />
      ) : null}
    </>
  );
};

export default Post;
