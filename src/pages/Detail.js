import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";
import MbDetail from "./MbDetail";
import UserId from "../components/User/UserId";

const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
`;

const Detail = () => {
  return (
    <Wrapper>
      <MyFeed />
      {/* <MbDetail /> */}
      {/* <Clickdetail /> */}
    </Wrapper>
  );
};

export default Detail;
