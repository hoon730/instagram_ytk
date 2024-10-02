import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import LogoImg from "../components/Common/LogoImg";
import LoginBtn from "../components/LoginBtn";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import FbBtn from "../components/FbBtn";

const colors = {
  sub2: "#6228D7",
  warning: "#FF5C2B",
  lightGray: "#EEEEEE",
  gray: "#BFBFBF",
  darkGray: "#7E7E7E",
  font: "#2B2B2B",
  bgLight: "#ffffff",
};

const Error = styled.p`
  color: ${colors.sub2};
  font-size: 14px;
`;

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
  font-size: 18px;

  &::-webkit-input-password,
  &::-webkit-clear-button,
  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
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

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Wrapper>
      <Block>
        <LogoImg />
        <Form>
          <InputBox>
            <LoginInput
              onChange={onChange}
              type="text"
              name="email"
              placeholder="이메일 또는 전화번호"
              value={email}
              required
            />
          </InputBox>
          <InputBox>
            <LoginInput
              onChange={onChange}
              // type="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="비밀번호"
              required
            />
            {password && (
              <PasswordBtn onClick={togglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiFillEye />}
              </PasswordBtn>
            )}
          </InputBox>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <LoginBtn value="로그인" />
        <FbBtn />
      </Block>
    </Wrapper>
  );
};

export default Login;
