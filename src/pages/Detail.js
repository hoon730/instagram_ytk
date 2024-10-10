import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";
// import Clickdetail from "../components/Detail/ClickFeed copy";
import MbDetail from "./MbDetail";

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
      {/* <Clickdetail/> */}
    </Wrapper>
  );
};

export default Detail;
