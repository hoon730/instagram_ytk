import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: ${({ width }) => `${width}` || "100%"};
  height: 50px;
  background: var(--light-gray-color);
  border-radius: var(--border-radius-8);
  padding-left: 10px;

  &::placeholder {
    color: var(--gray-color);
    font-weight: var(--font-regular);
  }
`;

const CommentInput = ({ width }) => {
  const [comment, setComment] = useState("");

  return (
    <div>
      <StyledInput
        value={comment}
        placeholder="댓글 달기... "
        width={width}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default CommentInput;
