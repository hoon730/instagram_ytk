import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { extractExtension, videoArr } from "../../utils/utils";
import { StateContext } from "../../App";
import ClickFeed from "./ClickFeed";

const Wrapper = styled.div`
  width: 100%;
  height: 305px;
  border-radius: var(--border-radius-8);
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    height: 0;
    padding-top: 100%;
  }
`;

const Filter = styled.div`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1024px) {
    position: absolute;
    top: 0;
    left: 0;
  }
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

const Post = ({ post }) => {
  const [followingUser, setFollowingUser] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { allProfile } = useContext(StateContext);
  const { myProfile } = useContext(StateContext);

  // useEffect(() => {
  //   const likeFollowing = post.like.find((it) =>
  //     myProfile.following.includes(it)
  //   );

  //   if (likeFollowing) {
  //     const profileData = allProfile.find((it) => it.uid === likeFollowing);
  //     setFollowingUser(profileData);
  //   }
  // }, [post.like, myProfile.following, allProfile]);

  const showFeed = () => {
    setIsClicked((current) => !current);
  };

  return (
    <>
      <Wrapper onClick={showFeed}>
        <Filter>
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
        </Filter>
      </Wrapper>
      {isClicked && <ClickFeed feedDetail={post} onClick={showFeed} />}
    </>
  );
};

export default Post;
