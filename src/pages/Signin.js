import React from "react";
import styled from "styled-components";
import LoginInput from "../components/common/LoginInput";
import Button from "../components/common/Button";

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
  padding: 45px;
  gap: 45px;
  border: 1px solid;
  border-color: ${(props) => colors[props.color || "gray"]};
  border-radius: 10px;
`;

const LogoImg = styled.img``;

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
  flex-direction: column;
`;

const AccountLogin = styled.div``;

const FBLogin = styled.div``;

const Signin = () => {
  return (
    <Wrapper>
      <Block>
        {/* <LogoImg/> */}
        <PleaseSignIn>
          가입하시고 인스타그램의 방대하고 흥미로운 컴텐츠를 누려보세요!
        </PleaseSignIn>
        <InputContainer>
          <LoginInput type="text" placeholder="사용자 이름" value="" />
          <LoginInput type="password" placeholder="비밀번호" value="" />
          <LoginInput type="text" placeholder="성명" value="" />
          <LoginInput type="email" placeholder="이메일" value="" />
          <SwitchEmailNPhone>전화번호로 가입하기</SwitchEmailNPhone>
          <LoginInput type="submit" value="가입" />
        </InputContainer>
        <Button type={'positive'}/>
        <LoginBlock>
          <AccountLogin></AccountLogin>
          <FBLogin></FBLogin>
        </LoginBlock>
      </Block>
    </Wrapper>
  );
};

export default Signin;
