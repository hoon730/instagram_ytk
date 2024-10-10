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

const Setup = ({ onClick }) => {
  const containerRef = useRef();

  console.log(onClick);

  const hideSetup = () => {
    onClick();
  };

  return (
    <Container
      ref={containerRef}
      onClick={(e) => {
        console.log("클릭");
        if (!containerRef.current.contains(e.target)) {
          hideSetup();
        }
      }}
    >
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Header
          leftChild={<Button text={"취소"} onClick={onClick}/>}
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
