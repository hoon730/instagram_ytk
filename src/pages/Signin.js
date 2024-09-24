import React, { useState } from "react";
import styled from "styled-components";
import LoginInput from "../components/LoginInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../components/LoginButton";

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
  padding: 45px;
  gap: 45px;
  border: 1px solid;
  border-color: var(--gray-color);
  border-radius: 10px;
`;

const LogoImg = styled.img`
  width: 200px;
`;

const PleaseSignIn = styled.p`
  color: ${(props) => colors[props.color || "gray"]};
  font-size: 14px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SwitchEmailNPhone = styled.p`
  color: ${(props) => colors[props.color || "sub2"]};
  font-size: 14px;
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
  color: var(--warning-color);
`;

const FBLogin = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 0;
  /* justify-content: start;
  align-items: start; */
  gap: 10px;
  color: var(--sub-purple-color);
`;

const FBLink = styled.a``;

const Signin = () => {
  const [name, setName] = useState();

  const onChange = (e) => {
    setName(e.target.value);
  };

  console.log(name);

  return (
    <Wrapper>
      <Block>
        <LogoImg src={"/images/logo.svg"} />
        <PleaseSignIn>
          가입하시고 인스타그램의 방대하고 흥미로운 컨텐츠를 누려보세요!
        </PleaseSignIn>
        <InputContainer>
          <LoginInput
            type="text"
            placeholder="사용자 이름"
            value={name}
            onChange={onChange}
          />
          <LoginInput type="password" placeholder="비밀번호" />
          <LoginInput type="text" placeholder="성명" />
          <LoginInput type="email" placeholder="이메일" />
          <SwitchEmailNPhone>전화번호로 가입하기</SwitchEmailNPhone>
          <LoginButton value="가입" />
        </InputContainer>
        <LoginBlock>
          <AccountLogin>
            <AccountQ>계정이 이미 있으신가요?</AccountQ>
            <AccountLink>로그인 하러가기</AccountLink>
          </AccountLogin>
          <FBLogin>
            <FontAwesomeIcon icon={faFacebook} />
            <FBLink>Facebook으로 로그인</FBLink>
          </FBLogin>
        </LoginBlock>
      </Block>
    </Wrapper>
  );
};

export default Signin;
