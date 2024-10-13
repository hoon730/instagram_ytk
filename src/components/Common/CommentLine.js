import React, { useState } from "react";
import styled from "styled-components";
import HoverProfile from "../User/HoverProfile";

const CommentBox = styled.div`
  float: left;
  position: relative;
`;

const IdSpan = styled.span`
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  margin-right: 15px;
  font-weight: bold;
`;

const CommentDesc = styled.span`
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const CommentLine = ({ userId, uid, comment }) => {
  const [hoverId, setHoverId] = useState(false);
  const showProfile = () => {
    setHoverId(true);
  };
  const hideProfile = () => {
    setHoverId(false);
  };
  return (
    <CommentBox>
      <IdSpan onMouseEnter={showProfile} onMouseLeave={hideProfile}>
        {userId}
      </IdSpan>
      <CommentDesc>{comment}</CommentDesc>
      {hoverId ? <HoverProfile target={"id"} top={"22"} uid={uid} /> : null}
    </CommentBox>
  );
};

export default CommentLine;
