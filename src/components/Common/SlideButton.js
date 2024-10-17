import React from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ButtonWrapper = styled.div`
  width: 26px;
  height: 26px;
  background: ${({ theme }) => theme.iconBgColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .slideButtonIcon {
    color: ${({ theme }) => theme.bgColor};
  }
  visibility: ${({ type, $visible, $limit }) =>
    type
      ? type === "left"
        ? $visible === 0
          ? "hidden"
          : "visible"
        : $visible === $limit - 6
        ? "hidden"
        : "visible"
      : "visible"};
  @media screen and (max-width: 430px) {
    visibility: ${({ type, $visible, $limit }) =>
      type
        ? type === "left"
          ? $visible === 0
            ? "hidden"
            : "visible"
          : $visible === $limit - 3
          ? "hidden"
          : "visible"
        : "visible"};
  }
`;

function SlideButton({ type, onClick, visible, limit }) {
  return (
    <ButtonWrapper
      onClick={onClick}
      type={type}
      $visible={visible}
      $limit={limit}
    >
      {type === "left" ? (
        <FaAngleLeft className="slideButtonIcon prev" />
      ) : (
        <FaAngleRight className="slideButtonIcon next" />
      )}
    </ButtonWrapper>
  );
}

export default SlideButton;
