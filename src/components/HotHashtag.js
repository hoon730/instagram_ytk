import React from "react";
import styled from "styled-components";
import HotHashtagItem from "./HotHashtagItem";
import Footer from "./Common/Footer/Footer";

const Wrapper = styled.div`
  width: 380px;
  height: 100%;
  padding: 36px;
  text-align: left;
  border-left: 1px solid var(--light-gray-color);
  /* border: 1px solid #6228d7; */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 22px;
  color: var(--font-black-color);
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const hotTagInfo = [
  {
    keyword: "#여행",
    postcount: "3.2만",
  },
  {
    keyword: "#맛집투어",
    postcount: "452만",
  },
  {
    keyword: "#제주도",
    postcount: "2만",
  },
  {
    keyword: "#서귀포",
    postcount: "3.7만",
  },
  {
    keyword: "#일상생활",
    postcount: "110만",
  },
  {
    keyword: "#마라탕",
    postcount: "8.6만",
  },
];

const HotHashtag = () => {
  return (
    <Wrapper>
      <Title>🔥지금 뜨는 #해시태그</Title>
      <ItemList>
        {hotTagInfo.map((it, idx) => (
          <HotHashtagItem
            key={`hotHashtag${idx}`}
            keyword={it.keyword}
            postcount={`게시물 ${it.postcount}개`}
          />
        ))}
      </ItemList>
      <Footer direction={"column"} />
    </Wrapper>
  );
};

export default HotHashtag;
