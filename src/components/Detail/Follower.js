import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../Common/SearchBar";
import SearchItem from "./SearchItem";

import { IoCloseOutline } from "react-icons/io5";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 20px;
  border-radius: var(--border-radius-12);
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const H3 = styled.h3`
  font-size: var(--font-20);
  font-weight: var(--font-regular);
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: var(--font-22);
  }
`;

const SearchList = styled.div``;

const Follower = () => {
  const [getUserNickName, setGetUserNickName] = useState("");
  const onChange = (e) => {
    setGetUserNickName(e.target.value);
  };

  return (
    <Wrapper>
      <Title>
        <H3>팔로워</H3>
        <CloseBtn>
          <IoCloseOutline />
        </CloseBtn>
      </Title>
      <SearchBar height={"40"} onChange={onChange} />
      <SearchList>
        <SearchItem
          userNickName={"lotte_ria"}
          userName={"코드분쇄기"}
          followed={"followed"}
          url={"/images/userImgs/user123456/followed_1.jpg"}
        />
        <SearchItem
          userNickName={"burxxxking"}
          userName={"decent"}
          followed={"followed"}
          url={"/images/userImgs/user123456/followed_2.jpg"}
        />
        <SearchItem
          userNickName={"bas_bg"}
          userName={"marcel"}
          url={"/images/userImgs/user123456/followed_3.jpg"}
        />
        <SearchItem
          userNickName={"westside"}
          userName={"두동강"}
          followed={"followed"}
          url={"/images/userImgs/user123456/followed_4.jpg"}
        />
        <SearchItem
          userNickName={"inner_v"}
          userName={"peace"}
          url={"/images/userImgs/user123456/followed_5.jpg"}
        />
      </SearchList>
    </Wrapper>
  );
};

export default Follower;
