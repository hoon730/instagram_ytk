import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

import { GoHash } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ type }) => (type === "mainSearch" ? "" : "padding-top: 15px;")}
  position: relative;
`;

const HashtagIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  color: ${({ theme }) => theme.nonActiveBtnColor};
  border: 1px solid ${({ theme }) => theme.nonActiveBtnColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HashtagName = styled.div`
  font-size: var(--font-14); 
  font-weight: var(--font-bold);
`;

const Detail = styled.div`
  display: flex;
  gap: 8px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;
const Desc = styled.span`
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FollowBtn = styled.button`
  font-size: var(--font-14);
  font-weight: var(--font-bold);
  color: var(--sub-purple-color);
  transition: all 0.3s;
  padding: 7px 10px;

  &:hover {
    background: var(--light-gray-color);
    border-radius: var(--border-radius-8);
  }
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: var(--font-22);
  }
`;

const SearchItem = ({ type, userName, userId, followed, profilePhoto, hashtag, hashtagCount }) => {
  return (
    <Container type={type}>
      {type === "mainSearch" && hashtag
      ? <Detail>
        <HashtagIcon>
          <GoHash size={20} />
        </HashtagIcon>
        <Info>
          <HashtagName>{hashtag}</HashtagName>
          <Desc>게시물 {hashtagCount}만</Desc>
        </Info>
      </Detail>
      : <Detail>
        <ProfileImg
          type={type === "mainSearch" ? null : "active"}
          size={type === "mainSearch" ? "60" : "44"}
          url={profilePhoto}
          hover={type === "mainSearch" ? "noHover" : null}
        />
        <Info>
          <UserId userNickname={userId} hover={type === "mainSearch" ? "noHover" : null} />
          <Desc>{userName}</Desc>
        </Info>
      </Detail>
      }
      {type === "mainSearch" || hashtag ? null : (
        <Btns>
          <FollowBtn>{followed ? "팔로우" : null}</FollowBtn>
          <CloseBtn>
            <IoCloseOutline />
          </CloseBtn>
        </Btns>
      )}
    </Container>
  );
};

export default SearchItem;
