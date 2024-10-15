import React, { useState, useContext } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import CommentLine from "../Common/CommentLine";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { getFormattedDate } from "../../utils/utils";

const CommentSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  .storyThirdCircle {
    width: 40px;
    height: 40px;
  }
`;

const CommentAndProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  //display: none; // 작업 후 삭제
`;

const CommentAndHeart = styled.div`
  display: flex;
  gap: 15px;
  .comment-box {
    flex: 1;
  }
`;

const DateAndButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RightBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReplyDate = styled.span`
  font-size: var(--font-12);
`;

const ReplyBtn = styled.button`
  font-size: var(--font-12);
  color: ${({ theme }) => theme.nonActiveBtnHoverColor};
  font-weight: var(--font-bold);
`;

const EditArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  display: none; // 작업 후 삭제
`;

const EditAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 5px;
`;

const IdSpan = styled.span`
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  margin-right: 15px;
  padding-top: 5px;
  font-weight: bold;
`;

const TextareaBg = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  background: ${({ theme }) => theme.borderColor};
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  background: transparent;
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid transparent;
  overflow-y: scroll;
  &:focus {
    outline: none;
  }
`;

const CommentItem = ({ onClick, reply }) => {
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);
  const [text, setText] = useState("");
  const focusingInput = () => {
    onClick();
  };
  const replyProfile = allProfile.find((it) => it.uid === reply.uid);

  return (
    <div>
      <CommentSection>
        <ProfileImg url={replyProfile.profilePhoto} size={40} />
        <CommentAndProfile>
          <CommentAndHeart>
            <CommentLine
              userId={replyProfile.userId}
              uid={replyProfile.uid}
              comment={reply.content}
            />
            <IoHeartOutline />
          </CommentAndHeart>
          <DateAndButton>
            <ReplyDate>{getFormattedDate(new Date(reply.createdAt))}</ReplyDate>
            <ReplyBtn onClick={focusingInput}>답글 달기</ReplyBtn>
            <ReplyBtn>수정</ReplyBtn>
            <ReplyBtn>삭제</ReplyBtn>
          </DateAndButton>
        </CommentAndProfile>
        <EditArea>
          <EditAreaHeader>
            <IdSpan>{replyProfile.userId}</IdSpan>
            <RightBtns>
              <ReplyBtn>저장</ReplyBtn>
              <ReplyBtn>취소</ReplyBtn>
            </RightBtns>
          </EditAreaHeader>
          <TextareaBg>
            <Textarea
              value={reply.content}
              onChange={(e) => setText(e.target.value)}
            />
          </TextareaBg>
        </EditArea>
      </CommentSection>
    </div>
  );
};

export default CommentItem;
