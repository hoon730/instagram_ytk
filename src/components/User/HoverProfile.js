import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "./UserId";
import PostAndFollow from "./PostAndFollow";
import Button from "../Common/Button";
import { mouseon } from "../../utils/utils";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

const Wrapper = styled(motion.div)`
  width: 380px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--border-radius-12);
  box-shadow: 0 0 20px ${({ theme }) => theme.shadowAlpha};
  ${({ top }) => (top ? `top: ${top}px;` : "top: 22px;")}
  ${({ $fix }) =>
    $fix
      ? "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);"
      : `position:absolute; left: 0;`};
  background: ${({ theme }) => theme.bgColor};
  z-index: 3;
`;

const Userinfo = styled.div`
  display: flex;
  gap: 15px;
`;

const Userdesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const Optional = styled.p`
  ${({ type }) =>
    type === "feed"
      ? `font-size: var(--font-14); font-weight: var(--font-regular);`
      : type === "hover"
      ? `font-size: var(--font-14); font-weight: var(--font-regular);`
      : `font-size: var(--font-16); font-weight: var(--font-regular);`}
  color: var(--gray-color);
`;

const PostingPics = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const ImgBox = styled.div`
  width: calc(100% / 3);
  height: 100px;
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

const Btns = styled.div`
  display: flex;
  gap: ${({ $followed }) => ($followed === "followed" ? "4px" : "0")};
  padding-top: 10px;
  & > .followBtn {
    transition: background 0s !important;
  }
`;

const extractExtension = (value) => {
  const firstSplit = value.split("?");
  const secondSplit = firstSplit[0].split(".");
  return secondSplit[secondSplit.length - 1].toLowerCase();
};

const HoverProfile = ({ type, uid, top, fix }) => {
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);
  const [hoverProfile, setHoverProfile] = useState(null);
  const [hoverFeed, setHoverFeed] = useState(null);
  const [followResult, setFollowResult] = useState(false);
  const videoArr = [
    "mp4",
    "avi",
    "mkv",
    "mov",
    "wmv",
    "flv",
    "webm",
    "m4v",
    "3gp",
    "ogv",
    "m2ts",
    "mts",
    "vob",
    "rmvb",
    "divx",
    "f4v",
    "asf",
    "swf",
    "mxf",
    "dv",
    "ts",
  ];

  useEffect(() => {
    if (!uid) return;
    const profileInfo = allProfile.find((it) => it.uid === uid);
    if (profileInfo) {
      setHoverProfile(profileInfo);
      setFollowResult(myProfile.following.includes(uid));
    }

    const fetchFeed = async () => {
      const feedQuery = query(
        collection(db, "feed"),
        where("uid", "==", uid),
        where("imgPath", "!=", null),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      const feedUnsubscribe = onSnapshot(feedQuery, (snapshot) => {
        const feeds = snapshot.docs.map((doc) => doc.data());
        setHoverFeed(feeds);
      });

      return () => feedUnsubscribe();
    };

    fetchFeed();
  }, [uid, myProfile, allProfile]);

  return (
    <Wrapper
      // variants={mouseon}
      initial="initial"
      animate="visible"
      exit="exits"
      top={top}
      $fix={fix}
    >
      <Userinfo>
        <ProfileImg
          size={"54"}
          type={type}
          url={hoverProfile && hoverProfile.profilePhoto}
        />
        <Userdesc>
          <UserId
            type={"feed"}
            userNickname={hoverProfile && hoverProfile.userId}
            check={hoverProfile && hoverProfile.badge ? "active" : ""}
            hover={true}
          />
          <Optional type={"feed"}>
            {hoverProfile && hoverProfile.userName}
          </Optional>
        </Userdesc>
      </Userinfo>
      <div>
        <PostAndFollow posting={"73"} follower={"255"} following={"358"} />
        <PostingPics>
          {hoverFeed &&
            hoverFeed.map((it, idx) => (
              <ImgBox key={idx}>
                {videoArr.includes(extractExtension(it.imgPath[0])) ? (
                  <Video src={it.imgPath[0]} />
                ) : (
                  <Img src={it.imgPath[0]} />
                )}
              </ImgBox>
            ))}
        </PostingPics>
        <Btns $followed={followResult ? "followed" : null}>
          {followResult ? (
            <Button
              width={"66.66%"}
              height={"40px"}
              type={"positive"}
              text={"메시지 보내기"}
            />
          ) : null}

          <Button
            width={followResult ? "33.33%" : "100%"}
            height={"40px"}
            followed={followResult ? "followed" : "unfollowed"}
            type={followResult ? "negative" : "positive"}
            text={followResult ? "팔로잉" : "팔로우"}
            className="followBtn"
          />
        </Btns>
      </div>
    </Wrapper>
  );
};

export default HoverProfile;
