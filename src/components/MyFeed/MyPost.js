import React from "react";
import MyPostItem from "./MyPostItem";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 935px;
`;

const MyPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MyPostBox = styled.div`
  width: 100%;
  height: 305px;
  display: flex;
  gap: 10px;
`;

const MyPost = () => {
  return (
    <Wrapper>
      <MyPostContainer>
        <MyPostBox>
          <MyPostItem url={"/images/postImgs/user1/post1.jpg"} />
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
