import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoImg from "../components/Login/LogoImg.js";
import LoginBtn from "../components/Login/LoginBtn.js";
import { PiLockLight } from "react-icons/pi";
import FbBtn from "../components/Login/FbBtn.js";
import { auth } from "../utils/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";

const colors = {
  sub2: "#6228D7",
  warning: "#FF5C2B",
  lightGray: "#EEEEEE",
  gray: "#BFBFBF",
  darkGray: "#7E7E7E",
  font: "#2B2B2B",
  bgLight: "#ffffff",
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 480px;
  width: 100%;
  max-width: 480px;
  padding: 40px;
  gap: 40px;
  border: 1px solid;
  border-color: var(--gray-color);
  border-radius: 10px;
  @media (max-width: 780px) {
    border-color: transparent;
  }
`;

const PwIcon = styled.div`
  border: 3px solid #000;
  border-radius: 50%;
  padding: 25px;
  font-size: 75px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
  &:focus-within {
    border-color: ${colors.sub2};
  }
`;

const LoginInput = styled.input`
  width: ${(props) => props.width || "100%"};
  font-size: 16px;

  &::-webkit-input-password,
  &::-webkit-clear-button,
  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label,
  &:valid ~ label {
    top: -11px;
    left: 5px;
    font-size: 12px;
    color: ${colors.sub2};
  }
  &:not(:focus):not(:placeholder-shown) ~ label {
    color: ${colors.darkGray};
  }
`;

const Label = styled.label`
  background: #fff;
  position: absolute;
  padding: 0 2px;
  left: 18px;
  top: 18px;
  font-size: 16px;
  color: ${colors.darkGray};
  pointer-events: none;
  transition: 0.2s ease all;
  @media (max-width: 370px) {
    font-size: 13px;
  }
`;

const Error = styled.p`
  color: #e00000;
  margin-top: -5px;
  padding-bottom: 10px;
  font-size: 12px;
`;

const LoginOrSignup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
  width: 100%;
  font-size: 14px;
  color: ${colors.darkGray};
`;

const LoginLink = styled.a`
  cursor: pointer;
`;

const VertLine = styled.div`
  border-left: 1px solid ${colors.gray};
  height: 14px;
`;

const SignUpLink = styled.a`
  cursor: pointer;
`;

const FindPw = () => {
  const [error, setError] = useState("");
  // const [emailError, setEmailError] = useState("");
  const [identity, setIdentity] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const userRef = useRef(null);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, identity);
      setMessage("입력하신 이메일 주소로 비밀번호 변경 메일이 전송되었습니다.");
    } catch (err) {
      setError(err.message);
    }
  };

  const logInLink = () => {
    navigate("/login");
  };

  const signUpLink = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <Block>
        <LogoImg />
        <PwIcon>
          <PiLockLight />
        </PwIcon>
        <Form onSubmit={onSubmit}>
          <InputBox>
            <LoginInput
              onChange={(e) => setIdentity(e.target.value)}
              type="text"
              name="identity"
              placeholder=""
              value={identity}
              ref={userRef}
              required
            />
            <Label>이메일 주소</Label>
          </InputBox>
          {message && <Error style={{ color: colors.sub2 }}>{message}</Error>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* {emailError && <Error>{emailError}</Error>} */}
          {/* {error !== "" ? <Error>{error}</Error> : null} */}
          <LoginBtn value="비밀번호 변경 링크보내기" />
          <LoginOrSignup>
            <LoginLink onClick={logInLink}>로그인 하러가기</LoginLink>
            <VertLine />
            <SignUpLink onClick={signUpLink}>회원가입 하기</SignUpLink>
          </LoginOrSignup>
          <FbBtn />
        </Form>
      </Block>
    </Wrapper>
  );
};

export default FindPw;
