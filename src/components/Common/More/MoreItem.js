import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  text-align: center;
  font-size: var(--font-14);
  transition: all 0.3s;
  border-bottom: ${({ last }) =>
    last === "last" ? null : `1px solid var(--light-gray-color);`};
  cursor: pointer;
  padding: ${({ padding }) => (padding ? padding : null)};
  ${({ text }) =>
    text === "신고"
      ? `color: var(--warning-color); font-weight: var(--font-bold);`
      : ""};

  &:hover {
    color: var(--gray-color);
  }
`;

const MoreItem = ({ text, padding, last }) => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <Wrapper
      padding={padding}
      text={text}
      last={last}
      onClick={text === "로그아웃" ? goLogin : null}
    >
      {text}
    </Wrapper>
  );
};

export default MoreItem;
