// v1. facebook 메시지
// v2. 전화번호&사용자(id) 한꺼번에 저장-계정 복수생성=복잡해져서 포기. 전화번호||이메일 등록으로 변경=전화번호가 등록이 안됨. 이메일 필수.
// 3. 문자숫자밑줄마침표만 아이디 등록할 때 허용. 아이디 추천 기능. <FaCheck /> <FaXmark /> <IoReload />
// v4. uid 임의로 변환-불가능
// v5. 리아님이 말씀하신대로 데이타베이스에 올라가는 거 수정.
// v6. Firebase: Error (auth/invalid-credential).파이어베이스 에러들 한글로 바꾸기. 로그인포맷, 같은이메일 존재
// 7. 눈모양 버튼 앤터 칠 떄 boolean 안바뀌도록
// v8. 로그인 id, 전번, 이메일과 비밀번호로 가능하게끔
// v9. 반응형. 370, 780
// 10. 로그인 전번간편로그인 기능
// . 부분적으로만 페이지상에서 렌더 되도록 쪼개기(코드 더 깔끔하게 다듬기)

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import LogoImg from "../components/Login/LogoImg";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LoginBtn from "../components/Login/LoginBtn";
import FbBtn from "../components/Login/FbBtn";
import { db } from "../utils/firebase"; // Import your Firestore instance
import { doc, setDoc } from "firebase/firestore";

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
  { name: "United States", code: "+1" },
  { name: "Canada", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Germany", code: "+49" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
  { name: "Australia", code: "+61" },
];

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
  padding: 40px;
  gap: 40px;
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  @media (max-width: 780px) {
    border-color: transparent;
  }
`;

const PleaseSignUp = styled.p`
  color: ${colors.sub2};
  font-size: 14px;
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
  &:not(:placeholder-shown) ~ label {
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
  color: ${colors.sub2};
  /* margin: 10px 0 -5px 0; */
  font-size: 14px;
`;

const PasswordBtn = styled.button`
  height: 21px;
  width: 45px;
  color: ${colors.font};
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  /* z-index: 1; */
  cursor: pointer;
`;

const DomainSelect = styled.select`
  height: 24px;
  border: none;
  border-left: 1px solid ${colors.gray};
  padding: 0 0 0 10px;
  color: ${colors.darkGray};
  font-size: 16px;
  outline: none;
  @media (max-width: 370px) {
    font-size: 13px;
  }
`;

// Styled Components
const CountrySelect = styled.div`
  position: relative;
  width: fit-content;
`;

const SelectedCountry = styled.div`
  display: flex;
  color: ${colors.darkGray};
  gap: 5px;
  padding-right: 10px;
  border-right: 1px solid #ccc;
  cursor: pointer;
`;

const CountryDropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: fit-content;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const CountryOption = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SwitchEmailNPhone = styled.p`
  display: flex;
  width: fit-content;
  color: ${(props) => colors[props.color || "sub2"]};
  font-size: 14px;
  gap: 5px;
  cursor: pointer;
`;

const LoginBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const AccountLogin = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
`;

const AccountQ = styled.p`
  color: ${colors.darkGray};
`;
const AccountLink = styled.a`
  position: absolute;
  right: 0;
  top: 33%;
  color: ${colors.darkGray};
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
  const [emailOption, setEmailOption] = useState(false);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    name: "대한민국",
    code: "+82",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const userIdRef = useRef(null);

  const onCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (userIdRef.current) {
      userIdRef.current.focus();
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
      return country + tel;
      // return country + tel;
    };
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        fullEmail(),
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: id });
      await setDoc(doc(db, "profile", credentials.user.uid), {
        uid: credentials.user.uid,
        userId: id,
        userName: name,
        phone: fullTel(),
        email: fullEmail(),
        badge: Boolean(false),
        bgPhoto: "",
        profilePhoto: "",
        website: "",
        gender: "",
        introduction: "",
        follower: [],
        following: [],
        nondisclosure: Boolean(false),
        recommendation: Boolean(false),
      });
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
          setEmailError("* 이메일 형식이 잘못되었습니다.");
        } else if (
          e.message == "Firebase: Error (auth/email-already-in-use)."
        ) {
          setEmailError("* 이미 사용중인 이메일입니다.");
        } else {
          setError(e.message);
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
    setEmailOption((prev) => !prev);
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
              ref={userIdRef}
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
          {emailError && <Error>{emailError}</Error>}
          {error !== "" ? <Error>{error}</Error> : null}
          <SwitchEmailNPhone onClick={toggleEmailNPhone}>
            전화번호 간편로그인 등록하기
            {emailOption ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </SwitchEmailNPhone>
          {emailOption ? (
            <InputBox>
              <CountrySelect ref={dropdownRef}>
                <SelectedCountry onClick={toggleDropdown}>
                  {selectedCountry.code}
                  <IoIosArrowDown />
                </SelectedCountry>
                {isDropdownOpen && (
                  <CountryDropdown>
                    {countries.map((country, index) => (
                      <CountryOption
                        key={index}
                        onClick={() => onCountrySelect(country)}
                      >
                        {country.name}
                      </CountryOption>
                    ))}
                  </CountryDropdown>
                )}
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
          ) : (
            ""
          )}
          <LoginBtn value="가입" />
        </Form>
        <LoginBlock>
          <AccountLogin>
            {/* <AccountQ>계정이 이미 있으신가요?</AccountQ> */}
            <FbBtn />
            <AccountLink onClick={loginLink}>로그인하기</AccountLink>
          </AccountLogin>
        </LoginBlock>
      </Block>
    </Wrapper>
  );
};

export default Signup;
