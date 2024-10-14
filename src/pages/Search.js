import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import styled from "styled-components";
import MyPostItem from "../components/MyFeed/MyPostItem";
import MainHeader from "../components/Main/MainHeader";
import { LuMoreHorizontal } from "react-icons/lu";
import { PiSirenLight } from "react-icons/pi";

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bgColor};
`;

const Margin = styled.div`
  height: 185px;
  @media screen and (max-width: 1170px) {
    height: 165px;
  }
  @media screen and (max-width: 630px) {
    height: 154px;
  }
`;

const NoResult = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WarningText = styled.div`
  margin: 0 auto;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--border-radius-8);
  text-align: center;
  font-size: var(--font-18);
  color: var(--dark-gray-color);
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
  z-index: 1;
  @media screen and (max-width: 1170px) {
    width: calc(100% - 20% - 80px);
    height: 80px;
  }
  @media screen and (max-width: 1024px) {
    width: calc(100% - 92px - 80px);
  }
  @media screen and (max-width: 630px) {
    width: calc(100% - 80px);
    top: 73px;
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
  width: 150px;
  padding: 20px 10px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: var(--font-16);
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

const Search = ({ page }) => {
  const [moreBtn, setMoreBtn] = useState(false);
  const [postList, setPostList] = useState([]);
  const [keyword] = useSearchParams();

  const getQuery = keyword.get("q") || "";

  const handleMoreBtn = () => {
    setMoreBtn((prev) => !prev);
  };

  useEffect(() => {
    fetchFeeds();
  }, [keyword]);

  const fetchFeeds = async () => {
    try {
      const s = await query(
        collection(db, "feed"),
        where("hashtag", "array-contains", `#${getQuery}`)
      );
      const querySnapshot = await getDocs(s);
      let feeds = [];

      querySnapshot.docs.map((doc) => {
        const data = doc.data();
        if (data) {
          feeds.push(data);
        }
      });

      setPostList(feeds);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <MainHeader />
      {page === "search" && getQuery === "" ? (
        <NoResult>
          <WarningText>유효하지 않은 접근입니다.</WarningText>
        </NoResult>
      ) : postList.length === 0 ? (
        <NoResult>
          <WarningText>검색결과가 없습니다.</WarningText>
        </NoResult>
      ) : (
        <>
          <Margin />
          <Container>
            <Header>
              <Keyword>{page === "search" ? `#${getQuery}` : "탐색"}</Keyword>
              <MoreIconArea>
                <MoreIcon onClick={handleMoreBtn}>
                  <LuMoreHorizontal size={22} />
                </MoreIcon>
                <MorePopup className={moreBtn ? "active" : ""}>
                  <PiSirenLight size={20} />
                  신고하기
                </MorePopup>
              </MoreIconArea>
            </Header>
            <ItemArea>
              {postList.map((it, index) => (
                <MyPostItem key={index} page={page} url={it.imgPath} />
              ))}
            </ItemArea>
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default Search;
