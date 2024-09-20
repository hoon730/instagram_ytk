import React from "react";
import styled from "styled-components";

const ButtonItem = styled.button`
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
  color: #fff;
  ${({ type }) =>
    type === "positive"
      ? `background: #6228D7;`
      : `background: #BFBFBF;`};
`;

const Button = ({ text, type, onClick, width }) => {
  return (
      <ButtonItem type={type} onClick={onClick}>
        {text || "버튼"} 
      </ButtonItem>
  );
};

export default Button;
