import React from "react";
import styled from "styled-components";

const ButtonItem = styled.button`
  width: ${({ width }) => `${width}` || "auto  "};
  padding: 10px 20px;
  height: 50px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
  color: #fff;
  ${({ type }) =>
    type === "positive"
      ? `background: #6228D7;`
      : type === "negative"
      ? `background: #BFBFBF;`
      : `background: transparent; color: #6228D7; font-size: var(--font-size-18); font-weight: var(--font-bold);`}
`;

const Button = ({ width, text, type, onClick }) => {
  return (
    <ButtonItem width={width} type={type} onClick={onClick}>
      {text || "버튼"}
    </ButtonItem>
  );
};

export default Button;
