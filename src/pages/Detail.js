import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";
import MbHeader from "../components/Detail/MbHeader";

const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  position: relative;
  z-index: 1;
`;

const Detail = () => {
  return (
    <Wrapper>
      <MbHeader />
      <MyFeed />
    </Wrapper>
  );
};

export default Detail;
