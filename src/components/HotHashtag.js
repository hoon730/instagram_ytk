import React from "react";
import styled from "styled-components";
import HotHashtagItem from "./HotHashtagItem";
import Footer from "./Footer/Footer";

const Wrapper = styled.div`
  width: 380px;
  height: 100vh;
  padding: 36px;
  text-align: left;
  border-left: 1px solid #eeeeee;
  /* border: 1px solid #6228d7; */
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 22px;
  color: #2b2b2b;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HotHashtag = () => {
  return (
    <Wrapper>
      <Title>🔥지금 뜨는 #해시태그</Title>
      <ItemList>
        <HotHashtagItem keyword="#여행" postcount="게시물 3.2만개" />
        <HotHashtagItem keyword="#맛집투어" postcount="게시물 452만개" />
        <HotHashtagItem keyword="#제주도" postcount="게시물 2만개" />
        <HotHashtagItem keyword="#서귀포" postcount="게시물 3.7만개" />
        <HotHashtagItem keyword="#일상생활" postcount="게시물 110만개" />
        <HotHashtagItem keyword="#마라탕" postcount="게시물 8.6만개" />
      </ItemList>
      <Footer direction="column" />
    </Wrapper>
  );
};

export default HotHashtag;
