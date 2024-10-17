import React from "react";
import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { HiOutlineUserPlus } from "react-icons/hi2";

const ButtonItem = styled.button`
  width: ${({ $width }) => `${$width}` || "auto"};
  height: ${({ $height }) => `${$height}` || "45px"};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $followed }) => ($followed === "unfollowed" ? "0" : "5px")};
  color: var(--bg-white-color);
  border: none;
  border-radius: var(--border-radius-8);
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "16px")};
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
  ${({ type, theme }) =>
    type === "positive"
      ? `background: ${theme.subColor};`
      : type === "negative"
      ? `background: ${theme.nonActiveBtnColor};`
      : `background: transparent; color: #6228D7;  font-weight: var(--font-bold);`};
  &:hover {
    ${({ type, theme }) =>
      type === "positive"
        ? `background: ${theme.buttonHoverColor};`
        : type === "negative"
        ? `background: ${theme.nonActiveBtnHoverColor};`
        : `background: transparent; color: #6228D7;  font-weight: var(--font-bold);`};
  }
`;

const MesseageBtn = styled.span`
  ${({ $followed }) => ($followed ? `display: flex` : "display: none")};
  justify-content: center;
  align-items: center;

  svg {
    font-weight: var(--font-bold);
    font-size: 21px;
  }
`;

const Button = ({ width, height, text, fontSize, type, onClick, followed }) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <ButtonItem
      $width={width}
      $height={height}
      fontSize={fontSize}
      type={type}
      onClick={onClick && handleOnClick}
      $followed={followed}
    >
      <MesseageBtn $followed={followed}>
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
