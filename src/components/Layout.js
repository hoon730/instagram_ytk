import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Common/Sidebar/SideBar";
import styled from "styled-components";
import MbMenu from "./Common/MbMenu/MbMenu";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.bgColor};
  position: relative;
  z-index: 1;
`;

const Margin = styled.div`
  width: 20%;
  @media screen and (max-width: 1024px) {
    width: 92px;
  }

  @media screen and (max-width: 630px) {
    width: 0;
  }
`;

const Container = styled.div`
  width: 80%;

  @media screen and (max-width: 1024px) {
    width: calc(100% - 92px);
  }

  @media screen and (max-width: 630px) {
    width: 100%;
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <SideBar />
      <Margin />
      <MbMenu />
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
};

export default Layout;
