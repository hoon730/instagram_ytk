import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 25px 0;
  text-align: center;
  font-size: var(--font-18);
  border-bottom: 1px solid var(--light-gray-color);
  ${({ text }) =>
    text === "신고"
      ? `color: var(--warning-color); font-weight: var(--font-bold);`
      : ""}
`;

const MoreItem = ({ text }) => {
  console.log(text)
  return <Wrapper text={text}>{text}</Wrapper>;
};

export default MoreItem;
