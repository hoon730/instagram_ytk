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
`;

function SlideButton({ type }) {
  return (
    <ButtonWrapper>
      {type === "left" ? (
        <FaAngleLeft className="slideButtonIcon" />
      ) : (
        <FaAngleRight className="slideButtonIcon" />
      )}
    </ButtonWrapper>
  );
}

export default SlideButton;
