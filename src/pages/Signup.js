// v1. facebook 메시지
// 2. 전화번호&사용자(id) 한꺼번에 저장-계정 복수생성=복잡해져서 포기. 전화번호||이메일 등록으로 변경=전화번호가 등록이 안됨..
// v3. FirebaseError+눈모양버튼+구조적 문제
// v4. uid 임의로 변환-불가능
// 5. 부분적으로만 페이지상에서 렌더 되도록 쪼개기(코드 더 깔끔하게 다듬기)
// v6. 디자인 좀 더 고민하기
// Firebase: Error (auth/invalid-credential).
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import LogoImg from "../components/Common/LogoImg";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import LoginBtn from "../components/LoginBtn";
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

const countries = [
  { name: "대한민국", code: "+82" },
  { name: "가나", code: "+233" },
  { name: "미국", code: "+1" },
  { name: "필리핀", code: "+63" },
  { name: "일본", code: "+81" },
  { name: "중국", code: "+86" },
  { name: "러시아", code: "+7" },
  { name: "독일", code: "+49" },
  { name: "프랑스", code: "+33" },
  { name: "영국", code: "+44" },
];

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.p`
  color: ${colors.sub2};
  /* margin: 10px 0 -5px 0; */
  font-size: 14px;
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

const PleaseSignUp = styled.p`
  color: ${colors.sub2};
  font-size: 14px;
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
  font-size: 18px;

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
  font-size: 18px;
  color: ${colors.darkGray};
  pointer-events: none;
  transition: 0.2s ease all;
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

const DomainSelect = styled.select`
  height: 21px;
  border: none;
  border-left: 1px solid ${colors.gray};
  padding: 0 0 0 10px;
  color: ${colors.darkGray};
  font-size: 18px;
  outline: none;
`;

const CountrySelect = styled.select`
  height: 21px;
  border: none;
  border-right: 1px solid ${colors.gray};
  color: ${colors.darkGray};
  font-size: 18px;
  outline: none;
`;

const SwitchEmailNPhone = styled.p`
  color: ${(props) => colors[props.color || "sub2"]};
  font-size: 14px;
  cursor: pointer;
`;

const LoginBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const AccountLogin = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
`;

const AccountQ = styled.p``;
const AccountLink = styled.a`
  color: ${colors.warning};
  cursor: pointer;
`;

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [domain, setDomain] = useState("@gmail.com");
  const [country, setCountry] = useState("+82");
  const [emailError, setEmailError] = useState(false);
  const [emailPhone, setEmailPhone] = useState(false);

  const navigate = useNavigate();
  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const onChange = (e) => {
    setEmailError("");
    setPasswordError("");
    const {
      target: { name, value },
    } = e;
    if (name === "id") setId(value);
    else if (name === "password") setPassword(value);
    else if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "tel") setTel(value);
  };

  const onDomainChange = (e) => {
    if (e.value !== "custom") setDomain(e.target.value);
    else if (e.value === "custom") setDomain("");
  };

  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };

  // const getFullEmail = () => {
  //   return email + domain;
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      // isLoading ||
      id === "" ||
      password === "" ||
      name === "" ||
      email === ""
    )
      return;
    const fullEmail = () => {
      return email + domain;
    };

    const fullTel = () => {
      return country + tel + "@" + "google" + ".com";
      // return country + tel;
    };
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        fullEmail() || fullTel(),
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: name });
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        if (
          e.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setPasswordError("* 비밀번호는 6자 이상으로 설정해주세요.");
        } else if (e.message == "Firebase: Error (auth/invalid-email).") {
          setEmailError("* 이메일란에 '@'가 있어야합니다.");
        }
      }
      /* } finally { */
      // setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleEmailNPhone = () => {
    setEmailPhone((prev) => !prev);
  };

  const loginLink = () => {
    navigate("/login");
  };

  const sortedCountries = countries.sort((a, b) =>
    a.name.localeCompare(b.name, "ko")
  );

  return (
    <Wrapper>
      <Block>
        <LogoImg />
        <PleaseSignUp>
          가입하시고 인스타그램의 방대하고 흥미로운 컨텐츠를 누려보세요!
        </PleaseSignUp>
        <Form onSubmit={onSubmit}>
          <InputBox>
            <LoginInput
              onChange={onChange}
              type="text"
              name="id"
              value={id}
              placeholder=" "
              ref={usernameRef}
              required
            />
            <Label>사용자 이름</Label>
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
          {passwordError && <Error>{passwordError}</Error>}
          <InputBox>
            <LoginInput
              onChange={onChange}
              type="text"
              name="name"
              placeholder=""
              value={name}
              required
            />
            <Label>성명</Label>
          </InputBox>
          {!emailPhone ? (
            <InputBox>
              <LoginInput
                onChange={onChange}
                type="text"
                name="email"
                placeholder=""
                value={email}
                required
                width="65%"
              />
              <Label>이메일</Label>
              <DomainSelect value={domain} onChange={onDomainChange}>
                <option value="@gmail.com">@gmail.com</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@daum.net">@daum.net</option>
                <option value="custom">직접 입력</option>
              </DomainSelect>
            </InputBox>
          ) : (
            <InputBox>
              <CountrySelect value={country} onChange={onCountryChange}>
                {sortedCountries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </CountrySelect>
              <LoginInput
                onChange={onChange}
                type="tel"
                name="tel"
                placeholder="전화번호"
                value={tel}
                required
                pattern="[0-9]{10,11}"
              />
            </InputBox>
          )}
          {emailError && <Error>{emailError}</Error>}
          <SwitchEmailNPhone onClick={toggleEmailNPhone}>
            {emailPhone ? "이메일로 가입하기" : "전화번호로 가입하기"}
          </SwitchEmailNPhone>
          <LoginBtn value="가입" />
        </Form>
        <LoginBlock>
          <AccountLogin>
            <AccountQ>계정이 이미 있으신가요?</AccountQ>
            <AccountLink onClick={loginLink}>로그인 하러가기</AccountLink>
          </AccountLogin>
          <FbBtn />
        </LoginBlock>
      </Block>
    </Wrapper>
  );
};

export default Signup;
