import React, { useState } from "react";
import styled from "styled-components";
import MyPostItem from "../components/MyFeed/MyPostItem";
import { LuMoreHorizontal } from "react-icons/lu";
import { PiSirenLight } from "react-icons/pi";
import MainHeader from "../components/Main/MainHeader";

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bgColor};
`;

const Margin = styled.div`
  height: 185px;
  @media screen and (max-width: 1170px) {
    height: 165px;
  }
`;

const Container = styled.div`
  width: 936px;
  margin: 0 auto;
  @media screen and (max-width: 1170px) {
    width: 100%;
    padding: 0 40px;
  }
`;

const Header = styled.div`
  width: 936px;
  height: 100px;
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.bgColor};
  position: fixed;
  top: 85px;
  color: ${({ theme }) => theme.fontColor};
  @media screen and (max-width: 1170px) {
    width: calc(100% - 20% - 80px);
    height: 80px;
  }
  @media screen and (max-width: 1024px) {
    width: calc(100% - 92px - 80px);
  }
  @media screen and (max-width: 630px) {
    width: calc(100% - 80px);
  }
`;

const Keyword = styled.div`
  font-size: var(--font-28);
  font-weight: var(--font-bold);
`;

const MoreIconArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1280px) {
    align-items: flex-end;
  }
`;

const MoreIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MorePopup = styled.div`
  width: 200px;
  padding: 20px 20px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: var(--font-20);
  color: var(--warning-color);
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background: ${({ theme }) => theme.bgColor};
  box-shadow: 0 5px 6px ${({ theme }) => theme.shadowAlpha};
  margin-top: 35px;
  z-index: 1;
  display: none;
  &.active {
    display: flex;
  }
`;

const ItemArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  @media screen and (max-width: 1170px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const mockUp = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];

const Search = () => {
  const [moreBtn, setMoreBtn] = useState(false);

  const handleMoreBtn = () => {
    setMoreBtn((prev) => !prev);
  };

  return (
    <Wrapper>
      <MainHeader />
      <Margin />
      <Container>
        <Header>
          <Keyword>#여행</Keyword>
          <MoreIconArea>
            <MoreIcon onClick={handleMoreBtn}>
              <LuMoreHorizontal size={22} />
            </MoreIcon>
            <MorePopup className={moreBtn ? "active" : ""}>
              <PiSirenLight size={24} />
              신고하기
            </MorePopup>
          </MoreIconArea>
        </Header>
        <ItemArea>
          {mockUp.map((it, index) => (
            <MyPostItem
              key={index}
              url={`/images/userImgs/bIqUJE0DxQa1HdkLfMqh105VOrQ/feed${it}.jpg`}
            />
          ))}
        </ItemArea>
      </Container>
    </Wrapper>
  );
};

export default Search;
