import React, { useState } from "react";
import { motion } from "framer-motion";
import reset from "styled-reset";
import styled from "styled-components";
import SlideBtn from "./SlideBtn";

const Wrapper = styled.div`
  width: 100%;
  ul {
    height: 37px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const EditBtns = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <p>프로필에 계정 추천 표시</p>
          <SlideBtn></SlideBtn>
        </li>
        <li>
          <p>비공개 프로필</p>
          <SlideBtn type={`positive`} move={`positive`}></SlideBtn>
        </li>
      </ul>
    </Wrapper>
  );
};

export default EditBtns;
