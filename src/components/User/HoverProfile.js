import React from "react";
import UserInfo from "./UserInfo";
import styled from "styled-components";
import UserDetail from "./UserDetail";

const Wrapper = styled.div`
  max-width: 550px;
  padding: 20px;
  border-radius: var(--border-radius-12);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
`;

const HoverProfile = () => {
  return (
    <Wrapper>
      <UserInfo type={"feed"} userNickname={"lotte_ria"} userName={"decent"} />
      <UserDetail posting={"73"} follower={"255"} following={"358"} />
      <p></p>
    </Wrapper>
  );
};

export default HoverProfile;
