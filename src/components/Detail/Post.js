import React, { useState } from "react";
import styled from "styled-components";
import ClickMyFeed from "./ClickMyFeed";

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

const Post = ({ myFeed, myProfile, post }) => {
  const [isClicked, setIsClicked] = useState(false);

  const showFeed = () => {
    setIsClicked((current) => !current);
  };

  return (
    <>
      {myFeed ? (
        <Wrapper onClick={showFeed}>
          {Array.isArray(myFeed.imgPath) ? (
            myFeed.imgPath.map((item, idx) =>
              myFeed.type === "img" ? (
                <Img key={idx} src={item} />
              ) : myFeed.type === "reels" ? (
                <Video key={idx} src={item} muted />
              ) : null
            )
          ) : myFeed.type === "img" ? (
            <Img src={myFeed.imgPath} />
          ) : myFeed.type === "reels" ? (
            <Video src={myFeed.imgPath} muted />
          ) : null}
        </Wrapper>
      ) : (
        <Wrapper onClick={showFeed}>
          {post && post.imgPath ? (
            Array.isArray(post.imgPath) ? (
              post.imgPath.map((item, idx) =>
                post.type === "img" ? (
                  <Img key={idx} src={item} />
                ) : post.type === "reels" ? (
                  <Video key={idx} src={item} muted />
                ) : null
              )
            ) : post.type === "img" ? (
              <Img src={post.imgPath} />
            ) : post.type === "reels" ? (
              <Video src={post.imgPath} muted />
            ) : null
          ) : (
            <p>미디어가 없습니다</p>
          )}
        </Wrapper>
      )}
      {isClicked ? (
        <ClickMyFeed
          myFeed={myFeed}
          myProfile={myProfile}
          post={post}
          onClick={showFeed}
        />
      ) : null}
    </>
  );
};

export default Post;
