import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "./UserId";
import PostAndFollow from "./PostAndFollow";
import Button from "../Common/Button";

const Wrapper = styled.div`
  max-width: 450px;
  padding: 20px;
  border-radius: var(--border-radius-12);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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
}) => {
  return (
    <Wrapper>
      <Userinfo>
        <ProfileImg
          size={"54"}
          type={"active"}
          url={"/images/userImgs/user123456/profile-photo.jpg"}
        />
        <Userdesc>
          <UserId type={type} userNickname={"bbok"} check={"active"} />
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
