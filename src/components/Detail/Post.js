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
          {myFeed.type === "img" ? (
            <Img src={myFeed.imgPath} />
          ) : (
            <Video src={myFeed.imgPath} muted />
          )}
        </Wrapper>
      ) : (
        // post와 post.media가 존재하는지 확인 후 처리
        <Wrapper onClick={showFeed}>
          {post && post.media ? (
            post.media.map((item, idx) =>
              item.type === "img" ? (
                <Img key={idx} src={item.imgPath} />
              ) : (
                <Video key={idx} src={item.imgPath} muted />
              )
            )
          ) : (
            <p>미디어가 없습니다</p> // post나 media가 없는 경우 처리
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
