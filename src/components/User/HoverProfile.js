import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "./UserId";
import PostAndFollow from "./PostAndFollow";
import Button from "../Common/Button";
import { mouseon } from "../../utils/utils";

const Wrapper = styled(motion.div)`
  width: 380px;
  padding: 20px;
  border-radius: var(--border-radius-12);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  /* top: ${({ target }) => (target === "id" ? "22px" : "45px")}; */
  ${({ top }) => (top ? `top: ${top}px;` : "top: 22px;")}
  left: 0;
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
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Btns = styled.div`
  display: flex;
  gap: ${({ followed }) => (followed === "followed" ? "4px" : "0")};
  padding-top: 10px;
`;

const HoverProfile = ({
  type,
  userNickname,
  createDate,
  followed,
  location,
  top,
}) => {
  return (
    <Wrapper
      variants={mouseon}
      initial="initial"
      animate="visible"
      exit="exits"
      top={top}
    >
      <Userinfo>
        <ProfileImg
          size={"55"}
          type={"active"}
          url={"/images/userImgs/user123456/profile-photo.jpg"}
          hover={true}
        />
        <Userdesc>
          <UserId
            type={"feed"}
            userNickname={"bbok"}
            check={"active"}
            hover={true}
          />
          <Optional type={"feed"}>이젠 앞자리{location}</Optional>
        </Userdesc>
      </Userinfo>
      <div>
        <PostAndFollow posting={"73"} follower={"255"} following={"358"} />
        <PostingPics>
          <ImgBox>
            <Img src={"/images/userImgs/user123456/userdetail_1.jpg"} />
          </ImgBox>
          <ImgBox>
            <Img src={"/images/userImgs/user123456/userdetail_2.jpg"} />
          </ImgBox>
          <ImgBox>
            <Img src={"/images/userImgs/user123456/userdetail_3.jpg"} />
          </ImgBox>
        </PostingPics>
        <Btns followed={"followed"}>
          <Button
            width={"66.66%"}
            height={"40px"}
            followed={"followed"}
            type={"positive"}
            text={"메시지 보내기"}
          />
          <Button
            width={"33.33%"}
            height={"40px"}
            type={"negative"}
            text={"팔로우"}
          />
        </Btns>
      </div>
    </Wrapper>
  );
};

export default HoverProfile;
