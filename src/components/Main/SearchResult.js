import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import SearchItem from "../Detail/SearchItem";

const Wrapper = styled.div`
  width: 100%;
  max-height: 380px;
  padding: 20px 20px;
  position: absolute;
  display: flex;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background: ${({ theme }) => theme.bgColor};
  box-shadow: 0 5px 6px ${({ theme }) => theme.shadowAlpha};
  margin-top: 5px;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 1;
`;

const SearchList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MainSearchItem = styled.div`
  width: 100%;
  padding: 5px;
  border-radius: var(--border-radius-8);
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.iconBgColor};
  }
`;

const NoResult = styled.div`
  font-size: var(--font-18);
  color: var(--gray-color);
  display: block;
  &.active {
    display: none;
  }
`;

const SearchResult = ({ text }) => {
  const [getUserNickName, setGetUserNickName] = useState(`${text}`);
  const [getHashtag, setGetHashtag] = useState(`${text}`);
  const [allUser, setAllUser] = useState([]);
  const [allHashtag, setAllHashtag] = useState([]);
  const [hashtagCount, setHashtagCount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (text === "") {
      fetchHashtags();
      fetchUser();
    } else {
      setGetUserNickName(text);
      setGetHashtag(text);
    }
  }, [text]);

  const fetchHashtags = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feed"));
      let allHashtags = [];

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.hashtag) {
          allHashtags.push(...data.hashtag);
        }
      });

      const hashtagCountFun = allHashtags.reduce((accu, curr) => {
        accu[curr] = (accu[curr] || 0) + 1;
        return accu;
      }, {});
      const removeDuplAllHashtags = [...new Set(allHashtags)];

      setHashtagCount(hashtagCountFun);
      setAllHashtag(removeDuplAllHashtags);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUser = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "profile"));
      let allUsers = [];

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data) {
          allUsers.push(data);
        }
      });

      setAllUser(allUsers);
    } catch (err) {
      console.error(err);
    }
  };

  const showHashtag = () => {
    return getHashtag === "#" || getHashtag === ""
      ? []
      : allHashtag.filter((it) =>
          it.toLocaleLowerCase().includes(getHashtag.toLocaleLowerCase())
        );
  };

  const showUserNickName = () => {
    return getUserNickName === ""
      ? []
      : allUser.filter(
          (it) =>
            it.userId
              .toLocaleLowerCase()
              .includes(getUserNickName.toLocaleLowerCase()) ||
            it.userName
              .toLocaleLowerCase()
              .includes(getUserNickName.toLocaleLowerCase())
        );
  };

  return (
    <Wrapper>
      <SearchList>
        {text.startsWith("#")
          ? showHashtag().map((it, idx) => (
              <MainSearchItem
                key={idx}
                onClick={() =>
                  navigate(`/search?q=${it.toLocaleLowerCase().slice(1)}`)
                }
              >
                <SearchItem
                  type={"mainSearch"}
                  hashtag={it}
                  hashtagCount={hashtagCount[it]}
                />
              </MainSearchItem>
            ))
          : showUserNickName().map((it, idx) => (
              <MainSearchItem
                key={idx}
                onClick={() => navigate(`/profile?userId=${it.userId}`)}
              >
                <SearchItem type={"mainSearch"} {...it} />
              </MainSearchItem>
            ))}
        <NoResult
          className={
            getUserNickName === "" ||
            showUserNickName().length > 0 ||
            showHashtag().length > 0
              ? "active"
              : ""
          }
        >
          검색결과가 없습니다.
        </NoResult>
      </SearchList>
    </Wrapper>
  );
};

export default SearchResult;
