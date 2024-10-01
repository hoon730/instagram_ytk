import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px 0;
  text-align: center;
  font-size: var(--font-14);
  border-bottom: 1px solid var(--light-gray-color);
  cursor: pointer;
  ${({ text }) =>
    text === "신고"
      ? `color: var(--warning-color); font-weight: var(--font-bold);`
      : ""}
`;

const MoreItem = ({ text }) => {
  return <Wrapper text={text}>{text}</Wrapper>;
};

export default MoreItem;
