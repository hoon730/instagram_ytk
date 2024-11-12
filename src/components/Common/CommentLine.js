import React, { useState, useRef } from "react";
import styled from "styled-components";
import HoverProfile from "../User/HoverProfile";

const CommentBox = styled.div`
  float: left;
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
  font-size: var(--font-14);
`;

const CommentLine = ({ userId, uid, comment }) => {
  const [hoverId, setHoverId] = useState(false);
  const [position, setPosition] = useState(null);
  const idRef = useRef(null);
  const showProfile = () => {
    if (idRef.current) {
      const rect = idRef.current.getBoundingClientRect();
      setPosition([parseInt(rect.left), parseInt(rect.top)]);
    }
    setHoverId(true);
  };
  const hideProfile = () => {
    setPosition([0, 0]);
    setHoverId(false);
  };
  return (
    <CommentBox className="comment-box">
      <IdSpan onMouseEnter={showProfile} onMouseLeave={hideProfile} ref={idRef}>
        {userId}
      </IdSpan>
      <CommentDesc>{comment}</CommentDesc>
      {hoverId ? (
        <HoverProfile target={"id"} top={"22"} uid={uid} position={position} />
      ) : null}
    </CommentBox>
  );
};

export default CommentLine;
