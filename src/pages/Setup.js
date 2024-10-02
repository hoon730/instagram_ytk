import React, { useState } from "react";
import { motion } from "framer-motion";
import reset from "styled-reset";
import styled from "styled-components";
import Header from "../components/Edit/Header";
import Button from "../components/Common/Button";
import EditIntro from "../components/Edit/EditIntro";
import EditDesc from "../components/Edit/EditDesc";
import EditBtns from "../components/Edit/EditBtns";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 0 20px;
  width: 600px;
  height: 680px;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 30px;
`;

const Setup = () => {
  return (
    <Container>
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
