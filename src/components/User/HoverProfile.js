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
      <UserInfo type={"feed"} userNickname={"lotte_ria"} userName={"decent"}/>
      <UserNums/>
    </Wrapper>
  );
};

export default HoverProfile;
