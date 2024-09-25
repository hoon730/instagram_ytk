import React from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ButtonWrapper = styled.div`
  width: ${({ $bgsize }) => `${$bgsize || 26}`}px;
  height: ${({ $bgsize }) => `${$bgsize || 26}`}px;
  background: var(${({ $bgcolor }) => `${$bgcolor || "--light-gray-color"}`});
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .slideButtonIcon {
    color: var(${({ $fontcolor }) => `${$fontcolor || "--bg-white-color"}`});
  }
`;

function SlideButton({ type, bgsize, bgcolor, fontcolor }) {
  //console.log(type, bgsize, bgcolor, fontcolor);
  return (
    <ButtonWrapper $bgsize={bgsize} $bgcolor={bgcolor} $fontcolor={fontcolor}>
      {type === "left" ? (
        <FaAngleLeft className="slideButtonIcon" />
      ) : (
        <FaAngleRight className="slideButtonIcon" />
      )}
    </ButtonWrapper>
  );
}

export default SlideButton;
