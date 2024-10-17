import React, { useState } from "react";
import { motion } from "framer-motion";
import reset from "styled-reset";
import styled from "styled-components";

const BtnBox = styled.div`
  width: 70px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 630px) {
    width: 65px;
    height: 35px;
  }
`;

const BoxBg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background: ${({ theme }) => theme.borderColor};
  cursor: pointer;
  transition: all 0.3s;

  &.active {
    background: ${({ theme }) => theme.buttonHoverColor};
  }
`;

const BtnPoint = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg-white-color);
  position: absolute;
  right: 24px;
  margin: 0 8px;
  transition: all 0.3s;

  &.active {
    right: -2px;
  }

  @media screen and (max-width: 630px) {
    width: 26px;
    height: 26px;
  }
`;

const SlideBtn = () => {
  const [isToggle, setIsToggle] = useState(false);

  const onClick = () => {
    setIsToggle((positive) => !positive);
  };
  return (
    <BtnBox onClick={onClick}>
      <BoxBg className={isToggle ? "active" : ""}></BoxBg>
      <BtnPoint className={isToggle ? "active" : ""}></BtnPoint>
    </BtnBox>
  );
};

export default SlideBtn;
