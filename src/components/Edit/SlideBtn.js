import React from "react";
import styled from "styled-components";

const BtnBox = styled.div`
  width: 65px;
  height: 38px;
  /* border: 1px solid red; */
  position: relative;
  cursor: pointer;
`;

const BtnBg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  ${({ type }) =>
    type === "positive"
      ? `background: var(--sub-purple-color);`
      : `background: var(--light-gray-color);`};
`;

const Btn = styled.div`
  width: 30px;
  height: 30px;
  /* border: 1px solid red; */
  border-radius: 50%;
  background: var(--bg-white-color);
  position: absolute;
  top: 4px;
  left: 4px;
  ${({ move }) => (move === "positive" ? `left: 30px;` : `left: 4px;`)};
`;

const SlideBtn = ({ type }) => {
  return (
    <BtnBox>
      <BtnBg type={type}></BtnBg>
      <Btn move={type}></Btn>
    </BtnBox>
  );
};

export default SlideBtn;
