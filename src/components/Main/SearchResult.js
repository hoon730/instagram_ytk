import React, { useState } from "react";
import styled from "styled-components";
import SearchItem from "../Detail/SearchItem";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 20px;
  position: absolute;
  display: flex;
  align-items: center;
  border: 1px solid var(--light-gray-color);
  border-radius: 8px;
  background: var(--bg-white-color);
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
`;

const itemArray = [
  {
    userNickName: "lotte_ria",
    userName: "코드분쇄기",
    followed: "followed",
    url: "/images/userImgs/user123456/followed_1.jpg",
  },
  {
    userNickName: "burxxxking",
    userName: "decent",
    followed: "followed",
    url: "/images/userImgs/user123456/followed_2.jpg",
  },
  {
    userNickName: "bas_bg",
    userName: "marcel",
    url: "/images/userImgs/user123456/followed_3.jpg",
  },
  {
    userNickName: "westside",
    userName: "두동강",
    followed: "followed",
    url: "/images/userImgs/user123456/followed_4.jpg",
  },
  {
    userNickName: "inner_v",
    userName: "peace",
    url: "/images/userImgs/user123456/followed_5.jpg",
  },
];

const SearchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchResult = ({ text }) => {
  const [getUserNickName, setGetUserNickName] = useState("");

  const showUserNickName = () => {
    return getUserNickName === ""
      ? itemArray
      : itemArray.filter((it) =>
          it.userNickName
            .toLocaleLowerCase()
            .includes(getUserNickName.toLocaleLowerCase())
        );
  };

  return (
    <Wrapper>
      <SearchList>
        {showUserNickName().map((it, idx) => (
          <SearchItem key={idx} type={"mainSearch"} {...it} />
        ))}
      </SearchList>
    </Wrapper>
  );
};

export default SearchResult;
