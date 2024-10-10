import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

import Data from "../../data.json";

const user = Data.user;
const profile = Data.profile;
const feed = Data.feed;

const UserBox = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 5px;
`;

const Userinfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DateAndReply = styled.div`
  display: flex;
  gap: 10px;
`;

const Date = styled.span`
  font-size: var(--font-12);
`;

const ReplyBtn = styled.button`
  font-size: var(--font-12);
  color: var(--dark-gray-color);
  font-weight: var(--font-bold);
`;

const CommentItem = ({ onClick }) => {

  const focusingInput = () => {
    onClick();
  };
  return (
    <div>
      <UserBox>
        <ProfileImg size={"40"} url={"/images/newPostIcon.svg"} />
        <Userinfo>
          <UserId
            userNickname={"bbok"}
            content={"대관령 파티"}
            btn={"heart"}
          />
          <DateAndReply>
            <Date>2023년 12월 25일</Date>
            <ReplyBtn onClick={focusingInput}>답글 달기</ReplyBtn>
          </DateAndReply>
        </Userinfo>
      </UserBox>
    </div>
  );
};

export default CommentItem;
