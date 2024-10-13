import React, { useState } from "react";
import MyPostItem from "./MyPostItem";
import ClickFeed from "../Detail/ClickFeed";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  /* height: 934px; */
  background: ${({ theme }) => theme.bgColor};

  @media screen and (max-width: 780px) {
    width: 780px;
  }

  @media screen and (max-width: 430px) {
    width: 390px;
  }
`;

const MyPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const MyPostBox = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`;

const imgArr = [
  {
    id: 1,
    url: "/images/postImgs/user1/post1.jpg",
  },
  {
    id: 2,
    url: "/images/postImgs/user1/post2.jpg",
  },
  {
    id: 3,
    url: "/images/postImgs/user1/post3.jpg",
  },
  {
    id: 4,
    url: "/images/postImgs/user1/post4.jpg",
  },
  {
    id: 5,
    url: "/images/postImgs/user1/post5.jpg",
  },
  {
    id: 7,
    url: "/images/postImgs/user1/post7.jpg",
  },
  {
    id: 8,
    url: "/images/postImgs/user1/post8.jpg",
  },
  {
    id: 9,
    url: "/images/postImgs/user1/post9.jpg",
  },
];

const MyPost = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    setIsClicked((current) => !current);
  };
  return (
    <Wrapper>
      <MyPostContainer>
        <MyPostBox>
          <MyPostItem
            url={"/images/postImgs/user1/post1.jpg"}
            onClick={onClick}
          />
          {isClicked ? <ClickFeed onClick={onClick} /> : null}
          <MyPostItem url={"/images/postImgs/user1/post2.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post3.jpg"} />
          {/* {imgArr.map((it) => (
            <MyPostItem key={it.id} url={it.url} />
          ))} */}
        </MyPostBox>
        <MyPostBox>
          <MyPostItem url={"/images/postImgs/user1/post4.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post5.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post6.jpg"} />
        </MyPostBox>
        <MyPostBox>
          <MyPostItem url={"/images/postImgs/user1/post7.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post8.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post9.jpg"} />
        </MyPostBox>
        <MyPostBox>
          <MyPostItem url={"/images/postImgs/user1/post10.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post11.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post12.jpg"} />
        </MyPostBox>
        <MyPostBox>
          <MyPostItem url={"/images/postImgs/user1/post13.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post14.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post15.jpg"} />
        </MyPostBox>
        <MyPostBox>
          <MyPostItem url={"/images/postImgs/user1/post16.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post18.jpg"} />
          <MyPostItem url={"/images/postImgs/user1/post19.jpg"} />
        </MyPostBox>
      </MyPostContainer>
    </Wrapper>
  );
};

export default MyPost;
