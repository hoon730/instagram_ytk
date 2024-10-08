import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  border-bottom: ${({ last }) =>
    last === "last" ? null : `1px solid var(--light-gray-color);`};
  padding: ${({ padding }) => (padding ? `${padding}` : "auto")};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "16px")};
  cursor: pointer;
  ${({ text }) =>
    text === "신고" || text === "삭제"
      ? `color: var(--warning-color); font-weight: var(--font-bold);`
      : ""};

  &:hover {
    color: var(--gray-color);
  }
`;

const MoreItem = ({ text, padding, last, fontSize, onClick }) => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <Wrapper
      padding={padding}
      fontSize={fontSize}
      text={text}
      last={last}
      onClick={text === "로그아웃" ? goLogin : null}
    >
      {text}
    </Wrapper>
  );
};

export default MoreItem;
