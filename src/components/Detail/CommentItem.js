import React, { useContext } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import CommentLine from "../Common/CommentLine";
import Rereply from "./Rereply";

import { IoHeartOutline, IoHeartSharp, IoTrashOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

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
  display: none; // 작업 후 삭제
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
  justify-content: space-between;
  align-items: center;
`;

const LeftBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RightBtns = styled.div`
  display: flex;
  align-items: center;
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

const icon = `
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const DeleteBtn = styled(IoTrashOutline)`
  ${icon}
  color: ${({ theme }) => theme.nonActiveBtnHoverColor};
`;

const EditBtn = styled(GoPencil)`
  ${icon}
  color: ${({ theme }) => theme.nonActiveBtnHoverColor};
`;

const MoreComment = styled.div`
  width: fit-content;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--font-12);
  color: ${({ theme }) => theme.nonActiveBtnHoverColor};
  cursor: pointer;
`;

const Line = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.nonActiveBtnHoverColor};
  width: 30px;
  height: 1px;
`;

const RereplyGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EditArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  resize: none;
  background: ${({ theme }) => theme.borderColor};
  border: 1px solid transparent;
  border-radius: 8px;
  color: ${({ theme }) => theme.fontColor};
  overflow-y: scroll;
  &:focus {
    outline: none;
  }
`;

const TextareaBtn = styled.span`
  cursor: pointer;
  font-size: var(--font-12);
`;

const CommentItem = ({ onClick }) => {
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
          <DateAndButton>
            <LeftBtns>
              <Date>2023년 12월 25일</Date>
              <ReplyBtn>좋아요 10개</ReplyBtn>
              <ReplyBtn onClick={focusingInput}>답글 달기</ReplyBtn>
            </LeftBtns>
            <RightBtns>
              <EditBtn />
              <DeleteBtn />
            </RightBtns>
          </DateAndButton>
          <MoreComment>
            <Line></Line> 답글 보기(3개)
          </MoreComment>
          <RereplyGroup>
            <Rereply />
            <Rereply />
          </RereplyGroup>
        </CommentAndProfile>
        <EditArea>
          <EditAreaHeader>
            <IdSpan>{myProfile.userId}</IdSpan>
            <RightBtns>
              <TextareaBtn>수정</TextareaBtn>
              <TextareaBtn>취소</TextareaBtn>
            </RightBtns>
          </EditAreaHeader>
          <Textarea
            value={
              "메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야메롱이야"
            }
          />
        </EditArea>
      </CommentSection>
    </div>
  );
};

export default CommentItem;
