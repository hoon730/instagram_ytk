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

const Wrapper = styled.form`
  padding: 0 20px;
  width: 600px;
  height: 680px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  padding: 30px;
  background: ${({ theme }) => theme.bgColor};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitBtn = styled.input`
  height: 45px;
  font-size: var(--font-16);
  font-weight: var(--font-bold);
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.subColor};
`;

const Setup = ({ onClick }) => {
  const containerRef = useRef();
  const [userName, setUserName] = useState("");
  const [intro, setIntro] = useState("");
  const [link, setLink] = useState("");

  const hideSetup = () => {
    onClick();
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleIntro = (e) => {
    setIntro(e.target.value);
  };
  const handleLink = (e) => {
    setLink(e.target.value);
  };

  return (
    <Container
      ref={containerRef}
      onClick={(e) => {
        if (!containerRef.current.contains(e.target)) {
          hideSetup();
        }
      }}
    >
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Title>
          <Button text={"취소"} onClick={onClick} />
          <h3>프로필</h3>
          <SubmitBtn type="submit" value={"완료"} />
          {/* <Button text={"완료"} /> */}
        </Title>
        {/* <Header
          leftChild={<Button text={"취소"} onClick={onClick} />}
          title={"프로필 수정"}
          rightChild={<Button text={"완료"} />}
        /> */}
        <EditIntro></EditIntro>
        <EditDesc
          handleUserName={handleUserName}
          userName={userName}
          handleIntro={handleIntro}
          intro={intro}
          handleLink={handleLink}
          link={link}
        ></EditDesc>
        <EditBtns></EditBtns>
      </Wrapper>
    </Container>
  );
};

export default Setup;
