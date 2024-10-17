import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { dontReady } from "../utils/utils";
import styled from "styled-components";
import MyPostItem from "../components/MyFeed/MyPostItem";
import MainHeader from "../components/Main/MainHeader";
import ClickFeed from "../components/Detail/ClickFeed";
import SearchBar from "../components/Main/SearchBar";
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
  padding-bottom: 80px;
  @media screen and (max-width: 1170px) {
    width: 100%;
    padding: 0 30px;
    padding-bottom: 80px;
  }
`;

const Header = styled.div`
  width: 936px;
  height: 100px;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.bgColor};
  position: fixed;
  top: 85px;
  color: ${({ theme }) => theme.fontColor};
  z-index: 1;
  @media screen and (max-width: 1170px) {
    width: calc(100% - 20% - 60px);
    height: 80px;
  }
  @media screen and (max-width: 1024px) {
    width: calc(100% - 92px - 60px);
  }
  @media screen and (max-width: 630px) {
    width: calc(100% - 60px);
    top: 73px;
    ${({ page }) => page === "explore" && "padding: 0;"}
  }
`;

const SearchBarArea = styled.div`
  display: none;
  @media screen and (max-width: 630px) {
    display: block;
    width: 100%;
  }
`;

const Keyword = styled.div`
  font-size: var(--font-28);
  font-weight: var(--font-bold);
  @media screen and (max-width: 630px) {
    ${({ page }) => page === "explore" && "display: none;"}
  }
`;

const MoreIconArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1280px) {
    align-items: flex-end;
  }
  @media screen and (max-width: 630px) {
    ${({ page }) => page === "explore" && "display: none;"}
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
  const [isClicked, setIsClicked] = useState(false);
  const [postList, setPostList] = useState([]);
  const [clickedFeed, setClickedFeed] = useState({});
  const [keyword] = useSearchParams();
  const { allProfile } = useContext(StateContext);

  let getQuery = keyword.get("q") || "";

  const handleMoreBtn = () => {
    setMoreBtn((prev) => !prev);
  };

  const onClick = (feedDetail) => {
    setIsClicked(true);
    setClickedFeed(feedDetail);
  };

  useEffect(() => {
    if (getQuery && getQuery.trim() !== "" && page === "search" && allProfile) {
      const fetchHashtag = async () => {
        try {
          const q = query(
            collection(db, "feed"),
            where("hashtag", "array-contains", `#${getQuery}`)
          );
          const querySnapshot = await getDocs(q);
          let feeds = [];

          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            const feedProfile = allProfile.find((it) => it.uid === data.uid);
            if (data) {
              feeds.push({ ...data, profile: feedProfile, id: doc.id });
            }
          });
          setPostList(feeds);
        } catch (err) {
          console.error(err);
        }
      };

      fetchHashtag();
    } else if (page === "explore") {
      const fetchFeeds = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "feed"));
          let feeds = [];

          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            const feedProfile = allProfile.find((it) => it.uid === data.uid);
            if (data) {
              feeds.push({ ...data, profile: feedProfile, id: doc.id });
            }
          });

          const randomFeeds = feeds.sort(() => 0.5 - Math.random());

          const selectFeeds = randomFeeds.slice(0, 24);

          setPostList(selectFeeds);
        } catch (err) {
          console.error(err);
        }
      };

      fetchFeeds();
    } else {
      const fetchReels = async () => {
        try {
          const r = await query(
            collection(db, "feed"),
            where("type", "==", "reels")
          );
          const querySnapshot = await getDocs(r);
          let reels = [];

          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();

            const feedProfile = allProfile.find((it) => it.uid === data.uid);
            if (data) {
              reels.push({ ...data, profile: feedProfile, id: doc.id });
            }
          });

          setPostList(reels);
        } catch (err) {
          console.error(err);
        }
      };
      fetchReels();
    }
  }, [getQuery, page, allProfile]);

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
            <Header page={page}>
              {page === "explore" && (
                <SearchBarArea>
                  <SearchBar />
                </SearchBarArea>
              )}
              <Keyword page={page}>
                {page === "search"
                  ? `#${getQuery}`
                  : page === "explore"
                  ? "탐색"
                  : "릴스"}
              </Keyword>
              <MoreIconArea page={page}>
                <MoreIcon onClick={handleMoreBtn}>
                  <LuMoreHorizontal size={22} />
                </MoreIcon>
                <MorePopup
                  className={moreBtn ? "active" : ""}
                  onClick={dontReady}
                >
                  <PiSirenLight size={20} />
                  신고하기
                </MorePopup>
              </MoreIconArea>
            </Header>
            {postList.length > 0 && (
              <ItemArea>
                {postList.map((it, index) => (
                  <MyPostItem
                    key={index}
                    onClick={() => onClick(it)}
                    page={page}
                    url={it.imgPath}
                  />
                ))}
              </ItemArea>
            )}
            {isClicked && clickedFeed ? (
              <ClickFeed
                onClick={() => setIsClicked(false)}
                feedDetail={clickedFeed}
              />
            ) : null}
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default Search;
