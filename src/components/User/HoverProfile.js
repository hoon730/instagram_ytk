import React from "react";
import UserInfo from "./UserInfo";
import UserNums from "./UserNums";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
`

const HoverProfile = () => {
  return (
    <Wrapper>
      <UserInfo userId={"lotte_ria"} userNickname={"decent"}/>
      <UserNums/>
    </Wrapper>
  );
};

export default HoverProfile;
