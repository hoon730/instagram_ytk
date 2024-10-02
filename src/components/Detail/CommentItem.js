import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

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
        <ProfileImg
          size={"40"}
          url={"/images/userImgs/user123456/profile-photo.jpg"}
        />
        <Userinfo>
          <UserId
            userNickname={"bbok"}
            comment={"와 진짜 다른 세상같다!"}
            btn={"heart"}
          />
          <DateAndReply>
            <Date>대관령 목장</Date>
            <ReplyBtn onClick={focusingInput}>답글 달기</ReplyBtn>
          </DateAndReply>
        </Userinfo>
      </UserBox>
    </div>
  );
};

export default CommentItem;
