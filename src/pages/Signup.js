import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import LogoImg from "../components/Login/LogoImg";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaXmark, FaCheck } from "react-icons/fa6";
import LoginBtn from "../components/Login/LoginBtn";
import FbBtn from "../components/Login/FbBtn";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import CustomSelect from "../components/Login/CustomSelect";

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
];

const domains = [
  { name: "@gmail.com", code: "@gmail.com" },
  { name: "@yahoo.com", code: "@yahoo.com" },
  { name: "@naver.com", code: "@naver.com" },
  { name: "@kakao.com", code: "@kakao.com" },
  { name: "@hanmail.net", code: "@hanmail.net" },
  { name: "@daum.net", code: "@daum.net" },
  { name: "@hotmail.com", code: "@hotmail.com" },
  { name: "직접 입력", code: "직접 입력" },
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
    gap: 30px;
  }
`;

const PleaseSignUp = styled.p`
  color: ${colors.darkGray};
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
  padding: 15px 12px;
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
  left: ${(props) => props.left || "18px"};
  top: 18px;
  font-size: 16px;
  color: ${colors.darkGray};
  pointer-events: none;
  transition: 0.2s ease all;
  @media (max-width: 370px) {
    font-size: 13px;
  }
`;

const VertLine = styled.div`
  border-left: 1px solid ${colors.gray};
  height: 18px;
`;

const Error = styled.p`
  color: #e00000;
  margin-top: -5px;
  padding-bottom: 10px;
  font-size: 12px;
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

const PasswordValidation = styled.div`
  display: flex;
  color: ${colors.darkGray};
  gap: 5px;
  font-size: 12px;
`;
const Alphabet = styled.div`
  display: flex;
  gap: 2px;
`;
const Number = styled.div`
  display: flex;
  gap: 2px;
`;
const LetterLength = styled.div`
  display: flex;
  gap: 2px;
`;

const SwitchEmailNPhone = styled.p`
  display: flex;
  width: fit-content;
  color: ${(props) => colors[props.color || "sub2"]};
  font-size: 14px;
  gap: 5px;
  cursor: pointer;
  padding-bottom: 10px;
`;
const LoginBlock = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  flex-direction: column;
`;
const AccountLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  font-size: 14px;
  @media (max-width: 370px) {
    gap: 8px;
  }
`;
const AccountQ = styled.p`
  color: ${colors.darkGray};
`;
const AccountLink = styled.a`
  font-weight: 600;
  color: ${colors.darkGray};
  cursor: pointer;
`;
const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [isUserIdValid, setIsUserIdValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasAlphabet, setHasAlphabet] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [pwSubmitValid, setPwSubmitValid] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [domain, setDomain] = useState("@gmail.com");
  const [telOption, setTelOption] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [dropdownStates, setDropdownStates] = useState({
    country: {
      selected: countries[0],
      isOpen: false,
      hovered: null,
    },
    domain: {
      selected: domains[0],
      isOpen: false,
      hovered: null,
    },
  });
  const [tel, setTel] = useState("");
  const countryDropdownRef = useRef(null);
  const domainDropdownRef = useRef(null);
  // const [error, setError] = useState("");

  const navigate = useNavigate();
  const userIdRef = useRef(null);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownStates]);

  useEffect(() => {
    if (userIdRef.current) {
      userIdRef.current.focus();
    }
  }, []);

  const validatePassword = (value) => {
    setHasNumber(/\d/.test(value));
    setHasAlphabet(/[a-zA-Z]/.test(value));
    setIsMinLength(value.length >= 6);
    setIsPasswordValid(
      /\d/.test(value) && /[a-zA-Z]/.test(value) && value.length >= 6
    );
  };

  const onChange = (e) => {
    setEmailError("");
    setPwSubmitValid(false);
    const { name, value } = e.target;

    if (name === "id") {
      setId(value);
      checkUserId(value); // Check userId validity on input change
    } else if (name === "password") {
      setPassword(value);
      validatePassword(value);
    } else if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "tel") setTel(value);
  };

  const checkUserId = async (userId) => {
    if (!userId) {
      setUserIdError("");
      return;
    }
    const isValidUserId = /^[a-z0-9._]+$/.test(userId);
    if (!isValidUserId) {
      setUserIdError(
        <span>
          <FaXmark style={{ marginRight: "5px" }} />
          사용자 이름에는 알파벳 소문자, 숫자, 마침표, 밑줄만 사용할 수
          있습니다.
        </span>
      );
      setIsUserIdValid(false);
      return;
    }
    const userQuery = query(
      collection(db, "profile"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      setUserIdError(
        <span>
          <FaXmark style={{ marginRight: "5px" }} />이 사용자 이름은 이미 사용
          중입니다.
        </span>
      );
      setIsUserIdValid(false);
    } else {
      setUserIdError(
        <span style={{ color: "green" }}>
          <FaCheck style={{ marginRight: "5px" }} />
          사용 가능한 사용자 이름입니다.
        </span>
      );
      setIsUserIdValid(true);
    }
  };

  const onSelect = (type, option) => {
    setDropdownStates((prev) => ({
      ...prev,
      [type]: { ...prev[type], selected: option, isOpen: false },
    }));
    if (type === "country") setSelectedCountry(option);
    if (type === "domain")
      setDomain(option.code !== "직접 입력" ? option.code : "");
  };
  // const getFullEmail = () => {
  //   return email + domain;
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPwSubmitValid(true);
    if (
      !isUserIdValid ||
      !isPasswordValid ||
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
      return selectedCountry.code + tel;
    };
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        fullEmail(),
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: id });
      const data = {
        uid: credentials.user.uid,
        userId: id,
        userName: name,
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
      };
      if (tel) {
        data.phone = fullTel();
      }
      await setDoc(doc(db, "profile", credentials.user.uid), data);
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        // if (
        //   e.message ==
        //   "Firebase: Password should be at least 6 characters (auth/weak-password)."
        // ) {}
        if (e.message == "Firebase: Error (auth/invalid-email).") {
          setEmailError(
            <span>
              <FaXmark style={{ marginRight: "5px" }} />
              이메일 형식이 잘못되었습니다.
            </span>
          );
        } else if (
          e.message == "Firebase: Error (auth/email-already-in-use)."
        ) {
          setEmailError(
            <span>
              <FaXmark style={{ marginRight: "5px" }} />
              이미 사용중인 이메일입니다.
            </span>
          );
        } else {
          console.log(e.message);
          // setError(e.message);
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
    setTelOption((prev) => !prev);
  };

  const toggleDropdown = (type) => {
    setDropdownStates((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        isOpen: !prev[type].isOpen,
        hovered: !prev[type].isOpen ? null : prev[type].hovered,
      },
    }));
  };

  const handleHover = (type, option) => {
    setDropdownStates((prev) => ({
      ...prev,
      [type]: { ...prev[type], hovered: option },
    }));
  };

  const handleClickOutside = (event) => {
    if (
      dropdownStates.country.isOpen &&
      countryDropdownRef.current &&
      countryDropdownRef.current.previousElementSibling &&
      !countryDropdownRef.current.contains(event.target) &&
      !countryDropdownRef.current.previousElementSibling.contains(event.target)
    ) {
      setDropdownStates((prev) => ({
        ...prev,
        country: { ...prev.country, isOpen: false },
      }));
    }

    if (
      dropdownStates.domain.isOpen &&
      domainDropdownRef.current &&
      domainDropdownRef.current.previousElementSibling &&
      !domainDropdownRef.current.contains(event.target) &&
      !domainDropdownRef.current.previousElementSibling.contains(event.target)
    ) {
      setDropdownStates((prev) => ({
        ...prev,
        domain: { ...prev.domain, isOpen: false },
      }));
    }
  };

  const loginLink = () => {
    navigate("/login");
  };

  // 나라이름 순서대로
  // const sortedCountries = countries.sort((a, b) =>
  //   a.name.localeCompare(b.name, "ko")
  // );

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
          {userIdError && <Error>{userIdError}</Error>}
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
          {password && (
            <PasswordValidation>
              <Alphabet
                style={{
                  color:
                    pwSubmitValid && !hasAlphabet
                      ? "#e0000e"
                      : hasAlphabet
                      ? "green"
                      : colors.darkGray,
                }}
              >
                <FaCheck />
                영자포함
              </Alphabet>
              <Number
                style={{
                  color:
                    pwSubmitValid && !hasNumber
                      ? "#e0000e"
                      : hasNumber
                      ? "green"
                      : colors.darkGray,
                }}
              >
                <FaCheck />
                숫자포함
              </Number>
              <LetterLength
                style={{
                  color:
                    pwSubmitValid && !isMinLength
                      ? "#e0000e"
                      : isMinLength
                      ? "green"
                      : colors.darkGray,
                }}
              >
                <FaCheck />
                6글자이상
              </LetterLength>
            </PasswordValidation>
          )}
          {/* {passwordError && <Error>{passwordError}</Error>} */}
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
            <VertLine />
            <CustomSelect
              options={domains}
              selectedOption={dropdownStates.domain.selected}
              onOptionSelect={(option) => onSelect("domain", option)}
              isDropdownOpen={dropdownStates.domain.isOpen}
              toggleDropdown={() => toggleDropdown("domain")}
              handleOptionHover={(option) => handleHover("domain", option)}
              hoveredOption={dropdownStates.domain.hovered}
              ref={domainDropdownRef}
            />
          </InputBox>
          {emailError && <Error>{emailError}</Error>}
          {/* {error !== "" ? <Error>{error}</Error> : null} */}
          <SwitchEmailNPhone onClick={toggleEmailNPhone}>
            전화번호 등록하기
            {telOption ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </SwitchEmailNPhone>
          {telOption ? (
            <InputBox>
              <CustomSelect
                options={countries}
                selectedOption={dropdownStates.country.selected}
                onOptionSelect={(option) => onSelect("country", option)}
                isDropdownOpen={dropdownStates.country.isOpen}
                toggleDropdown={() => toggleDropdown("country")}
                handleOptionHover={(option) => handleHover("country", option)}
                hoveredOption={dropdownStates.country.hovered}
                ref={countryDropdownRef}
              />
              <VertLine />
              <LoginInput
                onChange={onChange}
                type="tel"
                name="tel"
                placeholder=""
                value={tel}
                required
                pattern="[0-9]{10,11}"
                width="82%"
              />
              <Label left="85px">전화번호</Label>
            </InputBox>
          ) : (
            ""
          )}
          <LoginBtn value="회원가입" />
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
