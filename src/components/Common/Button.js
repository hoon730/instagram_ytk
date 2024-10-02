import React from "react";
import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { HiOutlineUserPlus } from "react-icons/hi2";

const ButtonItem = styled.button`
  width: ${({ width }) => `${width}` || "auto  "};
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
  color: #fff;
  transition: background 0.3s;
  ${({ type }) =>
    type === "positive"
      ? `background: #6228D7;`
      : type === "negative"
      ? `background: #BFBFBF;`
      : `background: transparent; color: #6228D7; font-size: var(--font-size-18); font-weight: var(--font-bold);`};
  &:hover {
    ${({ type }) =>
      type === "positive"
        ? `background: #3E1494;`
        : type === "negative"
        ? `background: #A4A4A4;`
        : `background: transparent; color: #6228D7; font-size: var(--font-size-18); font-weight: var(--font-bold);`};
  }
`;

const MesseageBtn = styled.span`
  ${({ followed }) => (followed ? `display: flex` : "display: none")};
  justify-content: center;
  align-items: center;

  svg {
    font-weight: var(--font-bold);
    font-size: 21px;
  }
`;

const Button = ({ width, text, type, onClick, followed }) => {
  return (
    <ButtonItem width={width} type={type} onClick={onClick}>
      <MesseageBtn followed={followed}>
        {followed === "followed" ? (
          <IoPaperPlaneOutline />
        ) : followed === "unfollowed" ? (
          <HiOutlineUserPlus />
        ) : null}
      </MesseageBtn>
      <span>{text}</span>
    </ButtonItem>
  );
};

export default Button;
