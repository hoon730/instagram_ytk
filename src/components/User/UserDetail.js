import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid var(--light-gray-color);
`;

const PostandFollow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 25px 0;
`;

const NumberingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    text-align: center;
    font-size: var(--font-16);
    &:first-child {
      font-weight: var(--font-bold);
    }
  }
`;

const PostingPics = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const ImgBox = styled.div`
  width: calc(100% / 3);
`;
const Img = styled.img``;

const Btns = styled.div``;

const UserDetail = ({ posting, follower, following }) => {
  return (
    <Wrapper>
      <PostandFollow>
        <NumberingBox>
          <span>{posting}</span>
          <span>게시물</span>
        </NumberingBox>
        <NumberingBox>
          <span>{follower}</span>
          <span>팔로워</span>
        </NumberingBox>
        <NumberingBox>
          <span>{following}</span>
          <span>팔로잉</span>
        </NumberingBox>
      </PostandFollow>
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
      <Btns></Btns>
    </Wrapper>
  );
};

export default UserDetail;
