import React, { useContext } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import CommentLine from "../Common/CommentLine";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { StateContext } from "../../App";

const CommentSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const CommentAndProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const CommentAndHeart = styled.div`
  display: flex;
  gap: 15px;
  .comment-box {
    flex: 1;
  }
`;

const DateAndReply = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const Date = styled.span`
  font-size: var(--font-12);
`;

const ReplyBtn = styled.button`
  font-size: var(--font-12);
  color: ${({ theme }) => theme.nonActiveBtnHoverColor};
  font-weight: var(--font-bold);
`;

const Rereply = ({ onClick }) => {
  const { myProfile } = useContext(StateContext);
  const focusingInput = () => {
    onClick();
  };

  return (
    <div>
      <CommentSection>
        <ProfileImg url={myProfile.profilePhoto} size={40} />
        <CommentAndProfile>
          <CommentAndHeart>
            <CommentLine
              userId={"bbok"}
              uid={"ngDGV8Z7W2Qe3LvayhCLn1hAeSO2"}
              comment={
                "메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야"
              }
            />
            <IoHeartOutline />
          </CommentAndHeart>
          <DateAndReply>
            <Date>2023년 12월 25일</Date>
            <ReplyBtn>좋아요 10개</ReplyBtn>
          </DateAndReply>
        </CommentAndProfile>
      </CommentSection>
    </div>
  );
};

export default Rereply;
