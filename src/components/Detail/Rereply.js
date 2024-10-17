import React, { useState, useContext, useEffect, useRef } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import CommentLine from "../Common/CommentLine";
import { auth, db } from "../../utils/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

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

const icon = `
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Heart = styled(IoHeartOutline)`
  ${icon}
  color: ${({ theme }) => theme.iconColor};
`;

const HeartFill = styled(IoHeartSharp)`
  ${icon}
  color: var(--sub-pink-color);
  &:hover {
    color: #cf236a;
  }
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

const Rereply = ({ reply }) => {
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);
  const [likes, setLikes] = useState(reply.like);
  const [fillHeart, setFillHeart] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [text, setText] = useState();
  const textareaRef = useRef();

  useEffect(() => {
    setText(reply.content);
  }, [reply]);

  useEffect(() => {
    setFillHeart(likes.includes(myProfile.uid));
    updateDoc(doc(db, "re_reply", reply.id), { like: likes });
  }, [likes]);

  const toggleHeart = () => {
    if (fillHeart) {
      setLikes(likes.filter((it) => it !== myProfile.uid));
    } else {
      setLikes([...likes, myProfile.uid]);
    }
  };

  useEffect(() => {
    if (showEdit && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  }, [showEdit]);

  const openEditArea = () => {
    setShowEdit(true);
  };

  const user = auth.currentUser;
  const updateComment = () => {
    if (user?.uid !== reply.uid) return;
    updateDoc(doc(db, "re_reply", reply.id), { content: text });
    setShowEdit(false);
  };

  const deleteComment = () => {
    if (user?.uid !== reply.uid) return;
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    deleteDoc(doc(db, `re_reply`, reply.id));
  };

  const cancelEdit = () => {
    setShowEdit(false);
    setText(reply.content);
  };

  const replyProfile = allProfile.find((it) => it.uid === reply.uid);
  return (
    <div>
      <CommentSection>
        <ProfileImg url={replyProfile.profilePhoto} size={40} />
        {showEdit ? (
          <EditArea>
            <EditAreaHeader>
              <IdSpan>{replyProfile.userId}</IdSpan>
              <RightBtns>
                <ReplyBtn onClick={updateComment}>저장</ReplyBtn>
                <ReplyBtn onClick={cancelEdit}>취소</ReplyBtn>
              </RightBtns>
            </EditAreaHeader>
            <TextareaBg>
              <Textarea
                value={text}
                ref={textareaRef}
                onChange={(e) => setText(e.target.value)}
              />
            </TextareaBg>
          </EditArea>
        ) : (
          <CommentAndProfile>
            <CommentAndHeart>
              <CommentLine
                userId={replyProfile.userId}
                uid={replyProfile.uid}
                comment={reply.content}
              />
              {fillHeart ? (
                <HeartFill onClick={toggleHeart} />
              ) : (
                <Heart onClick={toggleHeart} />
              )}
            </CommentAndHeart>
            <DateAndButton>
              <ReplyDate>
                {getFormattedDate(new Date(reply.createdAt))}
              </ReplyDate>
              {reply.uid === myProfile.uid ? (
                <>
                  <ReplyBtn onClick={openEditArea}>수정</ReplyBtn>
                  <ReplyBtn onClick={deleteComment}>삭제</ReplyBtn>
                </>
              ) : null}
            </DateAndButton>
          </CommentAndProfile>
        )}
      </CommentSection>
    </div>
  );
};

export default Rereply;
