import React, { useState, useRef } from "react";
import reset from "styled-reset";
import styled from "styled-components";
import Header from "../components/Edit/Header";
import Button from "../components/Common/Button";
import EditIntro from "../components/Edit/EditIntro";
import EditDesc from "../components/Edit/EditDesc";
import EditBtns from "../components/Edit/EditBtns";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  padding: 0 20px;
  width: 600px;
  height: 680px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  padding: 30px;
  background: ${({ theme }) => theme.bgColor};
`;

const Setup = ({ setIsOpen }) => {
  const containerRef = useRef();

  return (
    <Container
      ref={containerRef}
      onClick={(e) => {
        console.log("클릭");
        if (e.target === containerRef.current) setIsOpen(true);
      }}
    >
      <Wrapper>
        <Header
          leftChild={<Button text={"취소"} />}
          title={"프로필 수정"}
          rightChild={<Button text={"완료"} />}
        />
        <EditIntro></EditIntro>
        <EditDesc></EditDesc>
        <EditBtns></EditBtns>
      </Wrapper>
    </Container>
  );
};

export default Setup;
