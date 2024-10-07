import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import LogoImg from "../components/Login/LogoImg";
import LoginBtn from "../components/Login/LoginBtn";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import FbBtn from "../components/Login/FbBtn";

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
  padding: 40px;
  gap: 40px;
  border: 1px solid;
  border-color: var(--gray-color);
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputBox = styled.div`
  position: relative;
  width: 400px;
  display: flex;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 15px 20px;
  justify-content: space-between;
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
  &:not(:placeholder-shown) ~ label {
    top: -11px;
    left: 5px;
    font-size: 12px;
    color: ${colors.sub2};
  }
`;

const Label = styled.label`
  background: #fff;
  position: absolute;
  padding: 0 2px;
  left: 18px;
  top: 12px;
  font-size: 16px;
  color: ${colors.darkGray};
  pointer-events: none;
  transition: 0.2s ease all;
`;

const Error = styled.p`
  color: ${colors.sub2};
  font-size: 14px;
`;

const PasswordBtn = styled.button`
  height: 21px;
  width: 45px;
  color: ${colors.font};
  font-size: 18px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  /* z-index: 1; */
  cursor: pointer;
`;

const SignUpOrPw = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  width: 100%;
  font-size: 14px;
  color: ${colors.darkGray};
`;

const FindPw = styled.a`
  cursor: pointer;
`;
const SignUpLink = styled.a`
  cursor: pointer;
`;

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const userRef = useRef(null);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") return;
    try {
      // setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        setError(e.message);
        if (e.message == "Firebase: Error (auth/invalid-credential).") {
          setError("이메일 혹은 비밀번호가 틀렸습니다.");
        }
      }
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const findPwLink = () => {
    navigate("/findPw");
  };

  const signUpLink = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <Block>
        <LogoImg />
        <Form onSubmit={onSubmit}>
          <InputBox>
            <LoginInput
              onChange={onChange}
              type="text"
              name="email"
              placeholder=""
              value={email}
              ref={userRef}
              required
            />
            <Label>이메일 또는 전화번호</Label>
          </InputBox>
          <InputBox>
            <LoginInput
              onChange={onChange}
              // type="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder=""
              required
            />
            <Label>비밀번호</Label>
            {password && (
              <PasswordBtn onClick={togglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiFillEye />}
              </PasswordBtn>
            )}
          </InputBox>
          {error !== "" ? <Error>{error}</Error> : null}
          <LoginBtn value="로그인" />
          <SignUpOrPw>
            <FindPw onClick={findPwLink}>비밀번호 찾기</FindPw>
            <SignUpLink onClick={signUpLink}>회원가입 하기</SignUpLink>
          </SignUpOrPw>
          <FbBtn />
        </Form>
      </Block>
    </Wrapper>
  );
};

export default Login;
