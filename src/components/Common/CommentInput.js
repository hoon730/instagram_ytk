import React, { useState, useEffect, useRef } from "react";
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
  transition: color 0.3s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.subColor};
  }
`;

const CommentInput = ({ width, height, addCmt, repleInfo }) => {
  const [comment, setComment] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (!repleInfo) return;

    setComment(`@${repleInfo.userId} `);
    inputRef.current.focus();
  }, [repleInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    addCmt(comment);
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
          ref={inputRef}
        />
        <Submit type="submit" value="게시" />
      </form>
    </Wrapper>
  );
};

export default CommentInput;
