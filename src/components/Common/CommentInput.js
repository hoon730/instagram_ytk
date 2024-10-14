import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: ${({ width }) => `${width}` || "auto"};
  height: ${({ height }) => `${height}` || "auto"};
  background: var(--light-gray-color);
  border-radius: var(--border-radius-8);
  padding: 0 20px;
  padding-right: 50px;

  &::placeholder {
    color: var(--gray-color);
    font-weight: var(--font-regular);
  }
`;
const Submit = styled.input`
  padding: 0px;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 14px;
  color: ${({ theme }) => theme.nonActiveBtnHoverColor};
  background: transparent;
  cursor: pointer;
`;

const CommentInput = ({
  width,
  height,
  comments,
  setComments,
  setPushComment,
}) => {
  const [comment, setComment] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, comment]);
    setPushComment(comment);
    setComment("");
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <StyledInput
          name="comment"
          value={comment}
          onChange={onChange}
          placeholder="댓글 달기... "
          width={width}
          height={height}
        />
        <Submit type="submit" value="게시" />
      </form>
    </Wrapper>
  );
};

export default CommentInput;
