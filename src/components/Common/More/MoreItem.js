import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--light-gray-color);
  padding: ${({ padding }) => (padding ? `${padding}` : "auto")};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "16px")};
  cursor: pointer;
  ${({ text }) =>
    text === "신고"
      ? `color: var(--warning-color); font-weight: var(--font-bold);`
      : ""}
`;

const MoreItem = ({ text, fontSize, padding }) => {
  return (
    <Wrapper padding={padding} fontSize={fontSize} text={text}>
      {text}
    </Wrapper>
  );
};

export default MoreItem;
