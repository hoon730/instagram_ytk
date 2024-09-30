import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "./UserId";
import PostAndFollow from "./PostAndFollow";
import Button from "../Common/Button";

const Wrapper = styled.div`
  max-width: 550px;
  padding: 20px;
  border-radius: var(--border-radius-12);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 60px;
  left: 0;
  background: var(--bg-white-color);
  z-index: 10;
`;

const Userinfo = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 20px;
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
      ? `font-size: var(--font-18); font-weight: var(--font-regular);`
      : `font-size: var(--font-16); font-weight: var(--font-regular);`}
  color: var(--gray-color);
  cursor: pointer;
`;

const PostingPics = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const ImgBox = styled.div`
  width: calc(100% / 3);
  cursor: pointer;
`;
const Img = styled.img``;

const Btns = styled.div`
  display: flex;
  gap: ${({ followed }) => (followed === "followed" ? "10px" : "0")};
  padding: 20px 0;
`;

const HoverProfile = ({
  type,
  userNickname,
  createDate,
  followed,
  location,
}) => {
  return (
    <Wrapper>
      <Userinfo>
        <ProfileImg
          size={"55"}
          type={"active"}
          url={"/images/userImgs/user123456/profile-photo.jpg"}
        />
        <Userdesc>
          <UserId type={"feed"} userNickname={"bbok"} check={"active"} />
          <Optional type={type}>Bank of America{location}</Optional>
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
            followed={"followed"}
            type={"positive"}
            text={"메시지 보내기"}
          />
          <Button width={"33.33%"} type={"negative"} text={"팔로우"} />
        </Btns>
      </div>
    </Wrapper>
  );
};

export default HoverProfile;
