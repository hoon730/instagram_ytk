import React from "react";
import styled from "styled-components";
import PostAndFollow from "./PostAndFollow";
import Button from "../Common/Button";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid var(--light-gray-color);
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

const UserDetail = ({ posting, follower, following, followed }) => {
  return (
    <Wrapper>
        <PostAndFollow posting={posting} follower={follower} following={following}/>
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
        <Button width={"33.33%"} type={"negative"} text={"팔로우"}/>
      </Btns>
    </Wrapper>
  );
};

export default UserDetail;
