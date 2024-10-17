import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import LogoImg from "../components/Login/LogoImg.js";
import LoginBtn from "../components/Login/LoginBtn.js";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaXmark, FaCheck } from "react-icons/fa6";
import FbBtn from "../components/Login/FbBtn.js";
import { auth, db } from "../utils/firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: 100%;
  gap: 15px;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  width: 100%;
  display: flex;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 15px 20px;
  justify-content: space-between;
  align-items:center;
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

const PasswordBtn = styled.button`
  height: 21px;
  width: 45px;
  color: ${colors.font};
  font-size: 18px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  /* tabIndex: -1; */
`;

const Error = styled.p`
  color: #e00000;
  margin-top: -5px;
  padding-bottom: 10px;
  font-size: 12px;
`;

const SignUpOrPw = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
  width: 100%;
  font-size: 14px;
  color: ${colors.darkGray};
`;

const FindPw = styled.a`
  cursor: pointer;
`;

const VertLine = styled.div`
  border-left: 1px solid ${colors.gray};
  height: 14px;
`;

const SignUpLink = styled.a`
  cursor: pointer;
`;

const Login = () => {
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [identity, setIdentity] = useState("");
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

    if (name === "identity") setIdentity(value);
    if (name === "identity") setIdentity(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (identity === "" || password === "") return;
    try {
      let emailToLogin = identity;
      const isEmail = identity.includes("@");

      if (!isEmail) {
        const userRef = collection(db, "profile");
        let userDoc = null;

        const userIdQuery = query(userRef, where("userId", "==", identity));
        const userIdSnapshot = await getDocs(userIdQuery);
        if (!userIdSnapshot.empty) {
          userDoc = userIdSnapshot.docs[0].data();
        }

        if (!userDoc) {
          const phoneQuery = query(userRef, where("phone", "==", identity));
          const phoneSnapshot = await getDocs(phoneQuery);
          if (!phoneSnapshot.empty) {
            userDoc = phoneSnapshot.docs[0].data();
          }
        }

        if (userDoc) {
          emailToLogin = userDoc.email; // Get email from Firestore data
        } else {
          setEmailError(<span>
            <FaXmark style={{ marginRight: '5px' }} />
            일치하는 유저가 없습니다.
          </span>);
          return;
        }
      }

      // Attempt sign-in with email and password
      await signInWithEmailAndPassword(auth, emailToLogin, password);
      console.log("Login successful, navigating...");
      navigate("/");
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        if (e.message == "Firebase: Error (auth/invalid-email).") {
          setEmailError(<span>
            <FaXmark style={{ marginRight: '5px' }} />
            이메일 형식이 잘못되었습니다.
          </span>);
        } else if (e.message == "Firebase: Error (auth/invalid-credential).") {
          setError(         
            <span>
              <FaXmark style={{ marginRight: '5px' }} />
              비밀번호를 다시 확인해 주세요.
            </span>);
        } else if (
          e.message ==
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setError(
              <span>
                <FaXmark style={{ marginRight: '5px' }} />
                다수의 로그인 시도로 인해 계정이 잠겼습니다. 잠시뒤 다시 시도해주세요.
              </span>);
        } else {
          setError(e.message);
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
              name="identity"
              placeholder=""
              value={identity}
              ref={userRef}
              required
            />
            <Label>사용자이름, 전화번호 또는 이메일주소</Label>
          </InputBox>
          {emailError && <Error>{emailError}</Error>}
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
              <PasswordBtn type="button" onClick={togglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </PasswordBtn>
            )}
          </InputBox>
          {error !== "" ? <Error>{error}</Error> : null}
          <LoginBtn value="로그인" />
          <SignUpOrPw>
            <FindPw onClick={findPwLink}>비밀번호 찾기</FindPw>
            <VertLine />
            <SignUpLink onClick={signUpLink}>회원가입 하기</SignUpLink>
          </SignUpOrPw>
          <FbBtn />
        </Form>
      </Block>
    </Wrapper>
  );
};

export default Login;
